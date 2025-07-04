// src/data/sampleCourses.js
export const sampleCourses = [
  {
    id: 1,
    title: "Introduction aux Algorithmes",
    description: "Concepts fondamentaux des algorithmes : complexité, tri, recherche. Structures de données essentielles.",
    subject: "Informatique",
    isFavorite: true,
    createdAt: "2024-01-15T10:00:00Z"
  },
  {
    id: 2,
    title: "Calcul Différentiel",
    description: "Dérivées, limites, applications géométriques. Théorèmes fondamentaux du calcul différentiel.",
    subject: "Mathématiques",
    isFavorite: false,
    createdAt: "2024-01-14T14:30:00Z"
  },
  {
    id: 3,
    title: "Révolution Française",
    description: "Causes, événements majeurs, conséquences. Analyse des transformations politiques et sociales.",
    subject: "Histoire",
    isFavorite: true,
    createdAt: "2024-01-13T09:15:00Z"
  },
  {
    id: 4,
    title: "Chimie Organique - Bases",
    description: "Hydrocarbures, groupes fonctionnels, réactions de substitution. Nomenclature IUPAC.",
    subject: "Chimie",
    isFavorite: false,
    createdAt: "2024-01-12T16:45:00Z"
  },
  {
    id: 5,
    title: "Grammaire Anglaise Avancée",
    description: "Temps complexes, voix passive, conditionnels. Structures grammaticales pour le niveau B2-C1.",
    subject: "Langues",
    isFavorite: true,
    createdAt: "2024-01-11T11:20:00Z"
  }
];

// Fonction pour initialiser les données d'exemple
export const initializeSampleData = () => {
  const existingData = localStorage.getItem('mes-cours-cie-data');
  
  if (!existingData) {
    localStorage.setItem('mes-cours-cie-data', JSON.stringify(sampleCourses));
    console.log('✅ Données d\'exemple initialisées !');
    return true;
  }
  
  console.log('ℹ️ Données existantes trouvées, pas d\'initialisation');
  return false;
};
