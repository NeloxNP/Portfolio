// Mock data - centralized portfolio content
export const profile = {
  firstName: "Gabriel",
  lastName: "Anderlucci",
  age: 18,
  title: "Étudiant en BUT Métiers du Multimédia & de l'Internet",
  location: "Arles, France",
  email: "gabriel.ander07@gmail.com",
  linkedin: "https://www.linkedin.com/in/gabriel-anderlucci-a010aa3a4",
  cvVideo: "https://youtu.be/VW1ZUjuqGd4",
  initials: "GA",
  tagline: "Création audiovisuelle, design & communication.",
  available: "Stage de 4 semaines · Juin",
};

export const about = {
  greeting: "Salut ! Moi c'est Gabriel.",
  paragraphs: [
    "J'ai 18 ans et je suis actuellement en première année de BUT Métiers du Multimédia et de l'Internet (MMI) à Arles.",
    "Depuis tout petit, je suis passionné par la création audiovisuelle. Je m'amusais déjà à filmer avec mes amis, à monter de petites vidéos tournées dans le jardin… et finalement, je n'ai jamais arrêté.",
    "Communiquer avec les gens, raconter des histoires et soigner chaque détail visuel — voilà ce qui me fait vibrer. Aujourd'hui, je cherche un stage de 4 semaines au mois de juin pour mettre mes compétences à l'œuvre et valider mon année.",
  ],
  facts: [
    { label: "Âge", value: "18 ans" },
    { label: "Formation", value: "BUT MMI · 1ʳᵉ année" },
    { label: "Ville", value: "Arles" },
    { label: "Recherche", value: "Stage · Juin" },
  ],
};

export const projects = [
  {
    id: "salon-jv",
    title: "Salon du Jeu Vidéo d'Arles",
    subtitle: "Affiche & court-métrage",
    year: "2025",
    category: "Design · Vidéo",
    description:
      "Affiche et court-métrage réalisés dans le cadre d'un concours pour le Salon du Jeu Vidéo d'Arles. Direction artistique, tournage et montage.",
    tags: ["Affiche", "Court-métrage", "Direction artistique"],
    accent: "rose",
    media: {
      type: "choice",
      options: [
        {
          kind: "image",
          label: "Voir l'affiche",
          subtitle: "Réalisée pour un concours",
          thumbnail: "https://customer-assets.emergentagent.com/job_my-portfolio-794/artifacts/p1q9bg1f_ANDERLUCCI_Gabriel-Affiche-1_page-0001.jpg",
          full: "https://customer-assets.emergentagent.com/job_my-portfolio-794/artifacts/p1q9bg1f_ANDERLUCCI_Gabriel-Affiche-1_page-0001.jpg",
        },
        {
          kind: "video",
          label: "Voir le court-métrage",
          subtitle: "Sur YouTube",
          thumbnail: "https://customer-assets.emergentagent.com/job_my-portfolio-794/artifacts/dk4nck37_image%20%282%29.png",
          url: "https://youtu.be/NscMtnww6GQ?si=wk7Ag8nyn-KHfgVY",
        },
      ],
    },
  },
  {
    id: "box-della-mamma",
    title: "La Box Della Mamma",
    subtitle: "ApéroBox fictive aux saveurs d'Italie",
    year: "2025",
    category: "Branding · Communication",
    description:
      "Création complète d'une marque fictive d'ApéroBox italienne : charte graphique, identité, page Instagram, campagne de financement participatif et stratégie marketing.",
    tags: ["Charte graphique", "Communication", "Marketing"],
    accent: "blue",
    media: {
      type: "gallery",
      images: [
        "https://customer-assets.emergentagent.com/job_my-portfolio-794/artifacts/o3bkav1k_image.png",
        "https://customer-assets.emergentagent.com/job_my-portfolio-794/artifacts/ro4czuos_image%20%281%29.png",
      ],
    },
  },
  {
    id: "pokedexia",
    title: "Pokedexia",
    subtitle: "Mon premier site web",
    year: "2025",
    category: "Développement · Design",
    description:
      "Un Pokédex interactif pour répertorier les Pokémon, consulter leurs types et leurs évolutions. Premier vrai projet de développement front-end.",
    tags: ["HTML", "CSS", "JavaScript"],
    accent: "blueDeep",
    media: {
      type: "gallery-link",
      images: [
        "https://customer-assets.emergentagent.com/job_my-portfolio-794/artifacts/vmnkn0xj_image%20%283%29.png",
        "https://customer-assets.emergentagent.com/job_my-portfolio-794/artifacts/iqb3ozrm_image%20%284%29.png",
      ],
      cta: { label: "Visiter Pokedexia", url: "https://but-mmi.github.io/Pokedexia/" },
    },
  },
  {
    id: "crousty-movies",
    title: "Crousty Movies",
    subtitle: "Plateforme de cinéphiles",
    year: "2026",
    category: "Développement web",
    description:
      "Site dynamique pour répertorier des films, ajouter des commentaires, noter, voir les nouveautés et gérer la base depuis une interface admin.",
    tags: ["PHP", "SQL", "CSS"],
    accent: "rose",
    media: {
      type: "gallery",
      images: [
        "https://customer-assets.emergentagent.com/job_my-portfolio-794/artifacts/h4x8r24t_image%20%285%29.png",
        "https://customer-assets.emergentagent.com/job_my-portfolio-794/artifacts/0yk2opr8_image%20%286%29.png",
      ],
    },
  },
  {
    id: "affiche-retro",
    title: "Affiche d'un objet rétro",
    subtitle: "De la musique seulement pour vous",
    year: "2026",
    category: "Design graphique",
    description:
      "Affiche rétro autour d'un Sony Walkman. Contraintes : aucune ombre, aplats de couleur uniquement et 6 couleurs maximum. Chaque détail compte.",
    tags: ["Illustration", "Aplats", "6 couleurs"],
    accent: "blue",
    media: {
      type: "gallery",
      images: [
        "https://customer-assets.emergentagent.com/job_my-portfolio-794/artifacts/91nz9a77_Affiche_vintage_ANDERLUCCI_page-0001%20%281%29.jpg",
      ],
    },
  },
  {
    id: "dark-patterns",
    title: "Les Dark Patterns",
    subtitle: "Vidéo pédagogique",
    year: "2026",
    category: "Vidéo",
    description:
      "De l'écriture du synopsis au montage final, en passant par le scénario et le tournage. Un projet complet pour s'exprimer par l'image.",
    tags: ["Synopsis", "Scénario", "Tournage", "Montage"],
    accent: "blueDeep",
    media: {
      type: "external",
      url: "https://www.youtube.com/watch?v=WVj98bol2R0",
    },
  },
];

export const interests = [
  {
    title: "Cinéma & Audiovisuel",
    text: "Du petit garçon de Camargue qui filmait flamants roses et taureaux à l'étudiant qui monte ses propres courts-métrages.",
    icon: "Film",
  },
  {
    title: "Jeux Vidéo",
    text: "Une culture, un univers narratif et une infinie source d'inspiration visuelle.",
    icon: "Gamepad2",
  },
  {
    title: "Culture",
    text: "Mes origines italiennes me suivent partout : la langue, la cuisine, les traditions familiales et cette manière chaleureuse de raconter le monde.",
    icon: "Globe2",
  },
  {
    title: "Sport",
    text: "Le foot avant tout : jouer, regarder les matchs, suivre les compétitions. Esprit d'équipe, dépassement et passion partagée.",
    icon: "Trophy",
  },
  {
    title: "Photographie",
    text: "Capturer un instant, cadrer une lumière, raconter sans mot. Une autre façon d'écrire.",
    icon: "Camera",
  },
  {
    title: "Voyages",
    text: "Découvrir d'autres cultures pour nourrir mes projets et ouvrir mon regard.",
    icon: "Plane",
  },
];

export const skills = [
  {
    group: "Design",
    items: ["Charte graphique", "Affiches", "Mise en page", "Identité visuelle"],
  },
  {
    group: "Vidéo",
    items: ["Écriture", "Tournage", "Montage", "Étalonnage"],
  },
  {
    group: "Développement",
    items: ["HTML", "CSS", "JavaScript", "PHP", "SQL"],
  },
  {
    group: "Communication",
    items: ["Stratégie", "Réseaux sociaux", "Marketing", "Storytelling"],
  },
];

export const navLinks = [
  { label: "Moi", href: "#about" },
  { label: "Projets", href: "#projects" },
  { label: "Intérêts", href: "#interests" },
  { label: "Compétences", href: "#skills" },
];
