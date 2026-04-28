// Mock data - centralized portfolio content
export const profile = {
  firstName: "Gabriel",
  lastName: "Anderlucci",
  age: 18,
  title: "Étudiant en BUT Métiers du Multimédia & de l'Internet",
  location: "Arles, France",
  email: "gabriel.ander07@gmail.com",
  linkedin: "https://www.linkedin.com/in/gabriel-anderlucci-a010aa3a4",
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
    year: "2024",
    category: "Design · Vidéo",
    description:
      "Réalisation d'une affiche et d'un court-métrage promotionnel pour le Salon du Jeu Vidéo d'Arles. Direction artistique, tournage et montage.",
    tags: ["Affiche", "Court-métrage", "Direction artistique"],
    accent: "violet",
  },
  {
    id: "box-della-mamma",
    title: "La Box Della Mamma",
    subtitle: "ApéroBox fictive aux saveurs d'Italie",
    year: "2024",
    category: "Branding · Communication",
    description:
      "Création complète d'une marque fictive d'ApéroBox italienne : charte graphique, identité, page Instagram, campagne de financement participatif et stratégie marketing.",
    tags: ["Charte graphique", "Communication", "Marketing"],
    accent: "blue",
  },
  {
    id: "pokedexia",
    title: "Pokedexia",
    subtitle: "Mon premier site web",
    year: "2024",
    category: "Développement · Design",
    description:
      "Un Pokédex interactif pour répertorier les Pokémon, consulter leurs types et leurs évolutions. Premier vrai projet de développement front-end.",
    tags: ["HTML", "CSS", "JavaScript"],
    accent: "blueDeep",
  },
  {
    id: "crousty-movies",
    title: "Crousty Movies",
    subtitle: "Plateforme de cinéphiles",
    year: "2024",
    category: "Développement web",
    description:
      "Site dynamique pour répertorier des films, ajouter des commentaires, noter, voir les nouveautés et gérer la base depuis une interface admin.",
    tags: ["PHP", "SQL", "CSS"],
    accent: "violet",
  },
  {
    id: "affiche-retro",
    title: "De la musique seulement pour vous",
    subtitle: "Affiche d'un objet rétro",
    year: "2024",
    category: "Design graphique",
    description:
      "Affiche rétro autour d'un Sony Walkman. Contraintes : aucune ombre, aplats de couleur uniquement et 6 couleurs maximum. Chaque détail compte.",
    tags: ["Illustration", "Aplats", "6 couleurs"],
    accent: "blue",
  },
  {
    id: "dark-patterns",
    title: "Les Dark Patterns",
    subtitle: "Vidéo pédagogique",
    year: "2024",
    category: "Vidéo",
    description:
      "De l'écriture du synopsis au montage final, en passant par le scénario et le tournage. Un projet complet pour s'exprimer par l'image.",
    tags: ["Synopsis", "Scénario", "Tournage", "Montage"],
    accent: "blueDeep",
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
    title: "Italie & Gastronomie",
    text: "Saveurs, traditions et art de vivre — mon projet Box Della Mamma en est un clin d'œil.",
    icon: "Utensils",
  },
  {
    title: "Design rétro",
    text: "Walkman, vinyles, polaroïds : un goût prononcé pour les objets et les graphismes vintage.",
    icon: "Radio",
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
  { label: "Contact", href: "#contact" },
];
