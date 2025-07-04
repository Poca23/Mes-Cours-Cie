// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import CourseCard from './components/CourseCard';
import CourseForm from './components/CourseForm';
import SearchBar from './components/SearchBar';
import CourseDetail from './components/CourseDetail';
import { getAllCourses, deleteCourse, updateCourse, addCourse } from './utils/storage';
import { initializeSampleData } from './data/sampleCourses';
import ExportButton from './components/ExportButton';

// Composant de la liste des cours (votre App.js actuel)
const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // Charger les cours au démarrage
  useEffect(() => {
    initializeSampleData();
    loadCourses();
  }, []);

  const loadCourses = () => {
    setLoading(true);
    const loadedCourses = getAllCourses();
    setCourses(loadedCourses);
    setFilteredCourses(loadedCourses);
    setLoading(false);
  };

  const handleAddCourse = (courseData) => {
    const newCourse = addCourse(courseData);
    if (newCourse) {
      const updatedCourses = [...courses, newCourse];
      setCourses(updatedCourses);
      setFilteredCourses(updatedCourses);
      setShowForm(false);
    }
  };

  const handleDeleteCourse = (courseId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce cours ?')) {
      if (deleteCourse(courseId)) {
        const updatedCourses = courses.filter(course => course.id !== courseId);
        setCourses(updatedCourses);
        setFilteredCourses(updatedCourses.filter(course => 
          filteredCourses.some(fc => fc.id === course.id)
        ));
      }
    }
  };

  const handleToggleFavorite = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    if (course) {
      const updatedCourse = updateCourse(courseId, { 
        isFavorite: !course.isFavorite 
      });
      if (updatedCourse) {
        const updatedCourses = courses.map(c => 
          c.id === courseId ? updatedCourse : c
        );
        setCourses(updatedCourses);
        setFilteredCourses(filteredCourses.map(c => 
          c.id === courseId ? updatedCourse : c
        ));
      }
    }
  };

  const handleFilteredCourses = (filtered) => {
    setFilteredCourses(filtered);
  };

  if (loading) {
    return (
      <div className="App">
        <div className="loading">
          <h2>🔄 Chargement des cours...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>📚 Mes Cours & Cie</h1>
        <p className="app-subtitle">Votre gestionnaire personnel de cours</p>
      </header>

      <main className="app-main">
        <div className="courses-container">
          <div className="courses-header">
            <h2>
              Mes Cours ({filteredCourses.length}
              {filteredCourses.length !== courses.length && ` sur ${courses.length}`})
            </h2>
            <button 
              className="btn-add-course"
              onClick={() => setShowForm(true)}
            >
              ➕ Ajouter un cours
            </button>
          </div>

          <SearchBar 
            courses={courses}
            onFilteredCourses={handleFilteredCourses}
          />

          <ExportButton 
            courses={courses}
            filteredCourses={filteredCourses}
          />
          
          <div className="courses-grid">
            {filteredCourses.length === 0 ? (
              <div className="empty-state">
                {courses.length === 0 ? (
                  <>
                    <p>Aucun cours trouvé</p>
                    <button 
                      className="btn-primary"
                      onClick={() => setShowForm(true)}
                    >
                      Ajouter un premier cours
                    </button>
                  </>
                ) : (
                  <p>Aucun cours ne correspond à vos critères de recherche</p>
                )}
              </div>
            ) : (
              filteredCourses.map(course => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onDelete={handleDeleteCourse}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))
            )}
          </div>
        </div>
      </main>

      {showForm && (
        <CourseForm
          onAddCourse={handleAddCourse}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

// Composant principal App avec routing
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CourseList />} />
        <Route path="/course/:id" element={<CourseDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
