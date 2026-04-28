# Portfolio Backend Contracts

## Overview
Backend pour le formulaire de contact du portfolio Gabriel Anderlucci.
Reçoit les messages, les stocke en MongoDB et notifie Gabriel par email via Resend.

## Mocked data to be replaced
- `/app/frontend/src/components/portfolio/Contact.jsx` actuellement stocke les
  soumissions dans `localStorage` (clé `contact_messages`). À remplacer par un
  vrai POST vers `/api/contact`.

## API Endpoints

### POST `/api/contact`
Reçoit un message du formulaire de contact public.

**Request body (JSON)** :
```json
{
  "name": "string (1..100, required)",
  "email": "string (email, required)",
  "message": "string (1..5000, required)"
}
```

**Response 200** :
```json
{
  "success": true,
  "id": "uuid"
}
```

**Response 422** : validation Pydantic
**Response 500** : erreur serveur (l'email peut échouer mais le message est sauvegardé)

**Effets de bord** :
1. Insert un document dans `db.contact_messages` :
   ```
   { id, name, email, message, created_at, email_sent, email_error }
   ```
2. Envoie un email via Resend à `gabriel.ander07@gmail.com` :
   - From : `Portfolio <onboarding@resend.dev>` (sandbox Resend)
   - Subject : `Nouveau message de {name} via le portfolio`
   - Body HTML stylé avec navy + mauve

## Environment variables (backend/.env)
- `MONGO_URL` (déjà présent)
- `DB_NAME` (déjà présent)
- `RESEND_API_KEY` (à ajouter)
- `CONTACT_EMAIL_TO` = `gabriel.ander07@gmail.com`
- `CONTACT_EMAIL_FROM` = `Portfolio <onboarding@resend.dev>`

## Frontend integration
- `Contact.jsx` :
  - Remplacer le bloc `localStorage.setItem(...)` par
    `axios.post(`${API}/contact`, { name, email, message })`
  - Conserver toasts de succès/échec et reset du formulaire
  - Afficher un message d'erreur clair si la requête échoue

## Out of scope (pour MVP)
- Authentification admin pour lister les messages
- Anti-spam / captcha
- Template email avancé
- Internationalisation
