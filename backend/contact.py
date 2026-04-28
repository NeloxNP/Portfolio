"""Contact form module — handles message persistence + email notification via Resend."""

import os
import uuid
import logging
from datetime import datetime, timezone
from typing import Optional

import resend
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr, Field

logger = logging.getLogger(__name__)

# ---- Resend setup ----
RESEND_API_KEY = os.environ.get("RESEND_API_KEY", "")
CONTACT_EMAIL_TO = os.environ.get("CONTACT_EMAIL_TO", "gabriel.ander07@gmail.com")
CONTACT_EMAIL_FROM = os.environ.get(
    "CONTACT_EMAIL_FROM", "Portfolio <onboarding@resend.dev>"
)

if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY


# ---- Schemas ----
class ContactCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    message: str = Field(..., min_length=1, max_length=5000)


class ContactResponse(BaseModel):
    success: bool
    id: str


# ---- Helpers ----
def _build_email_html(name: str, email: str, message: str) -> str:
    safe_msg = (
        message.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace("\n", "<br/>")
    )
    return f"""
    <!doctype html>
    <html lang="fr">
    <body style="margin:0;padding:0;background:#EAF3FB;font-family:Inter,Arial,sans-serif;color:#0F2A5E;">
      <table role="presentation" width="100%" style="background:#EAF3FB;padding:32px 16px;">
        <tr>
          <td align="center">
            <table role="presentation" width="600" style="max-width:600px;background:#FFFFFF;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(15,42,94,0.08);">
              <tr>
                <td style="background:#0F2A5E;color:#EAF3FB;padding:28px 32px;">
                  <div style="font-size:11px;letter-spacing:3px;text-transform:uppercase;opacity:.7;">Portfolio</div>
                  <div style="font-family:Georgia,serif;font-size:26px;margin-top:4px;">Nouveau message</div>
                </td>
              </tr>
              <tr>
                <td style="padding:28px 32px;">
                  <p style="margin:0 0 20px 0;font-size:15px;line-height:1.6;color:#0F2A5E;">
                    Tu as reçu un nouveau message via le formulaire de contact de ton portfolio.
                  </p>
                  <table role="presentation" width="100%" style="border-collapse:collapse;margin:0 0 22px 0;">
                    <tr>
                      <td style="padding:10px 14px;background:#EAF3FB;border-radius:8px;">
                        <div style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:rgba(15,42,94,0.6);">Nom</div>
                        <div style="font-size:16px;color:#0F2A5E;margin-top:2px;">{name}</div>
                      </td>
                    </tr>
                    <tr><td style="height:8px;"></td></tr>
                    <tr>
                      <td style="padding:10px 14px;background:#EAF3FB;border-radius:8px;">
                        <div style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:rgba(15,42,94,0.6);">Email</div>
                        <div style="font-size:16px;color:#0F2A5E;margin-top:2px;">
                          <a href="mailto:{email}" style="color:#5885C9;text-decoration:none;">{email}</a>
                        </div>
                      </td>
                    </tr>
                  </table>
                  <div style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:rgba(15,42,94,0.6);margin-bottom:8px;">Message</div>
                  <div style="padding:18px 20px;background:#E3DFF7;border-left:3px solid #9F85DD;border-radius:8px;font-size:15px;line-height:1.65;color:#452573;">
                    {safe_msg}
                  </div>
                  <div style="margin-top:28px;padding-top:18px;border-top:1px solid rgba(15,42,94,0.1);">
                    <a href="mailto:{email}" style="display:inline-block;background:#0F2A5E;color:#FFFFFF;padding:12px 22px;border-radius:999px;text-decoration:none;font-size:14px;">Répondre à {name}</a>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding:18px 32px;background:#F4F8FC;color:rgba(15,42,94,0.55);font-size:11px;text-align:center;">
                  Envoyé automatiquement depuis ton portfolio · gabriel-anderlucci.fr
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
    """


def _send_email(name: str, email: str, message: str) -> tuple[bool, Optional[str]]:
    """Returns (success, error_message)."""
    if not RESEND_API_KEY:
        return False, "RESEND_API_KEY not configured"
    try:
        params = {
            "from": CONTACT_EMAIL_FROM,
            "to": [CONTACT_EMAIL_TO],
            "reply_to": email,
            "subject": f"Nouveau message de {name} via le portfolio",
            "html": _build_email_html(name, email, message),
        }
        result = resend.Emails.send(params)
        logger.info(f"Resend email sent: {result}")
        return True, None
    except Exception as exc:  # noqa: BLE001
        logger.exception("Failed to send Resend email")
        return False, str(exc)


# ---- Router factory ----
def get_contact_router(db) -> APIRouter:
    router = APIRouter(prefix="/contact", tags=["contact"])

    @router.post("", response_model=ContactResponse)
    async def submit_contact(payload: ContactCreate):
        msg_id = str(uuid.uuid4())
        sent, err = _send_email(payload.name, payload.email, payload.message)

        doc = {
            "id": msg_id,
            "name": payload.name.strip(),
            "email": payload.email,
            "message": payload.message.strip(),
            "created_at": datetime.now(timezone.utc).isoformat(),
            "email_sent": sent,
            "email_error": err,
        }
        try:
            await db.contact_messages.insert_one(doc)
        except Exception:
            logger.exception("Failed to persist contact message")
            # Persistence failure — still raise 500 so user knows
            raise HTTPException(status_code=500, detail="Erreur d'enregistrement")

        # If email failed but persisted, still return success so user is not blocked
        return ContactResponse(success=True, id=msg_id)

    @router.get("/messages")
    async def list_messages(limit: int = 100):
        """Simple admin route — no auth in MVP. Returns the most recent messages."""
        cursor = db.contact_messages.find(
            {}, {"_id": 0}
        ).sort("created_at", -1).limit(min(limit, 500))
        return await cursor.to_list(length=limit)

    return router
