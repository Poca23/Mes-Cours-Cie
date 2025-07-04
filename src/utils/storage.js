// src/utils/storage.js
const STORAGE_KEY = 'mes-cours-cie-data';

// Récupérer tous les cours
export const getAllCourses = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Erreur lors de la lecture des cours:', error);
    return [];
  }
};

// Sauvegarder tous les cours
export const saveCourses = (courses) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
    return true;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error);
    return false;
  }
};

// Ajouter un nouveau cours
export const addCourse = (course) => {
  const courses = getAllCourses();
  const newCourse = {
    id: Date.now(), // ID simple basé sur timestamp
    ...course,
    createdAt: new Date().toISOString(),
  };
  courses.push(newCourse);
  return saveCourses(courses) ? newCourse : null;
};

// Supprimer un cours
export const deleteCourse = (courseId) => {
  const courses = getAllCourses();
  const filteredCourses = courses.filter(course => course.id !== courseId);
  return saveCourses(filteredCourses);
};

// Mettre à jour un cours
export const updateCourse = (courseId, updates) => {
  const courses = getAllCourses();
  const courseIndex = courses.findIndex(course => course.id === courseId);
  
  if (courseIndex !== -1) {
    courses[courseIndex] = { ...courses[courseIndex], ...updates };
    return saveCourses(courses) ? courses[courseIndex] : null;
  }
  return null;
};

// Rechercher dans les cours
export const searchCourses = (query) => {
  const courses = getAllCourses();
  const searchTerm = query.toLowerCase();
  
  return courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm) ||
    course.description.toLowerCase().includes(searchTerm) ||
    course.subject.toLowerCase().includes(searchTerm)
  );
};
