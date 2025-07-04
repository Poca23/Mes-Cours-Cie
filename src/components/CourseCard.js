// src/components/CourseCard.js
import React from 'react';
import './CourseCard.css';
import { Link } from 'react-router-dom';


const CourseCard = ({ course, onDelete, onToggleFavorite }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className={`course-card ${course.isFavorite ? 'favorite' : ''}`}>
      <div className="course-header">
        <h3 className="course-title">{course.title}</h3>
        <div className="course-actions">
          <button
            className={`btn-favorite ${course.isFavorite ? 'active' : ''}`}
            onClick={() => onToggleFavorite(course.id)}
            title={course.isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          >
            {course.isFavorite ? '⭐' : '☆'}
          </button>
          <button
            className="btn-delete"
            onClick={() => onDelete(course.id)}
            title="Supprimer ce cours"
          >
            🗑️
          </button>
          <Link 
              to={`/course/${course.id}`}
              className="btn-view-details"
            >
              👁️ Voir détails
          </Link>
        </div>
      </div>
      
      <div className="course-subject">
        <span className="subject-tag">{course.subject}</span>
      </div>
      
      <p className="course-description">{course.description}</p>
      
      <div className="course-footer">
        <small className="course-date">
          Créé le {formatDate(course.createdAt)}
        </small>
      </div>
    </div>
  );
};

export default CourseCard;
