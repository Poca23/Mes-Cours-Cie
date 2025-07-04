// src/components/CourseDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getAllCourses, updateCourse, deleteCourse } from '../utils/storage';
import { generateSingleCoursePDF } from '../utils/pdfExport';import './CourseDetail.css';


const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    const courses = getAllCourses();
    const foundCourse = courses.find(c => c.id === parseInt(id));
    if (foundCourse) {
      setCourse(foundCourse);
      setEditForm(foundCourse);
    } else {
      navigate('/');
    }
  }, [id, navigate]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedCourse = updateCourse(parseInt(id), editForm);
    if (updatedCourse) {
      setCourse(updatedCourse);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditForm(course);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce cours ?')) {
      if (deleteCourse(parseInt(id))) {
        navigate('/');
      }
    }
  };

  // Dummy PDF export handler (replace with real implementation if needed)
  const handleExportPDF = () => {
    generateSingleCoursePDF(course);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  if (!course) {
    return (
      <div className="course-detail">
        <div className="loading">
          <h2>🔄 Chargement du cours...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="course-detail">
      <header className="course-detail-header">
        <div className="breadcrumb">
          <Link to="/" className="back-link">
            ← Retour à la liste
          </Link>
          <h1>📚 Mes Cours & Cie</h1>
        </div>
      </header>

      <main className="course-detail-main">
        <div className="course-detail-content">
          {isEditing ? (
            <div className="edit-form">
              <div className="form-group">
                <label>Titre du cours *</label>
                <input
                  type="text"
                  name="title"
                  value={editForm.title || ''}
                  onChange={handleInputChange}
                  placeholder="Titre du cours"
                />
              </div>

              <div className="form-group">
                <label>Matière *</label>
                <select
                  name="subject"
                  value={editForm.subject || ''}
                  onChange={handleInputChange}
                >
                  <option value="">Sélectionner une matière</option>
                  <option value="Informatique">Informatique</option>
                  <option value="Mathématiques">Mathématiques</option>
                  <option value="Histoire">Histoire</option>
                  <option value="Chimie">Chimie</option>
                  <option value="Langues">Langues</option>
                  <option value="Physique">Physique</option>
                  <option value="Biologie">Biologie</option>
                  <option value="Géographie">Géographie</option>
                  <option value="Littérature">Littérature</option>
                  <option value="Philosophie">Philosophie</option>
                  <option value="Économie">Économie</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea
                  name="description"
                  value={editForm.description || ''}
                  onChange={handleInputChange}
                  placeholder="Description du cours"
                  rows="8"
                />
              </div>

              <div className="form-checkbox">
                <input
                  type="checkbox"
                  name="isFavorite"
                  checked={editForm.isFavorite || false}
                  onChange={handleInputChange}
                />
                <label>⭐ Marquer comme favori</label>
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  onClick={handleCancel}
                  className="btn-cancel"
                >
                  Annuler
                </button>
                <button 
                  type="button" 
                  onClick={handleSave}
                  className="btn-save"
                >
                  Sauvegarder
                </button>
              </div>
            </div>
          ) : (
            <div className="course-view">
              <div className="course-header">
                <h2>
                  {course.title}
                  {course.isFavorite && <span className="favorite-badge">⭐</span>}
                </h2>
                <div className="course-meta">
                  <span className="course-date">📅 {course.createdAt}</span>
                  <span className="course-subject">🏷️ {course.subject}</span>
                </div>
              </div>

              <div className="course-content">
                <h3>📝 Description</h3>
                <div className="course-description">
                  {course.description}
                </div>
              </div>

              <div className="course-actions">
                <button 
                  onClick={handleEdit}
                  className="btn-edit"
                >
                  ✏️ Éditer
                </button>
                <button onClick={handleExportPDF} className="btn-export">
                   📄 Exporter en PDF
                </button>
                <button 
                  onClick={handleDelete}
                  className="btn-delete"
                >
                  🗑️ Supprimer
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CourseDetail;
