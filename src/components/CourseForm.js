// src/components/CourseForm.js
import React, { useState } from 'react';
import './CourseForm.css';

const CourseForm = ({ onAddCourse, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    isFavorite: false
  });

  const [errors, setErrors] = useState({});

  const subjects = [
    'Informatique',
    'Mathématiques',
    'Histoire',
    'Langues',
    'Sciences',
    'Philosophie',
    'Économie',
    'Littérature',
    'Physique',
    'Chimie',
    'Biologie',
    'Géographie',
    'Art',
    'Musique',
    'Sport',
    'Autre'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Effacer l'erreur si le champ est rempli
    if (errors[name] && value.trim()) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Le titre est obligatoire';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'La description est obligatoire';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'La matière est obligatoire';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onAddCourse(formData);
      setFormData({
        title: '',
        description: '',
        subject: '',
        isFavorite: false
      });
    }
  };

  return (
    <div className="course-form-overlay">
      <div className="course-form-container">
        <div className="course-form-header">
          <h2>➕ Ajouter un nouveau cours</h2>
          <button className="btn-close" onClick={onCancel}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="course-form">
          <div className="form-group">
            <label htmlFor="title">Titre du cours *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={errors.title ? 'error' : ''}
              placeholder="Ex: Introduction à React"
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="subject">Matière *</label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={errors.subject ? 'error' : ''}
            >
              <option value="">Sélectionner une matière</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
            {errors.subject && <span className="error-message">{errors.subject}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className={errors.description ? 'error' : ''}
              placeholder="Décrivez le contenu du cours..."
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>

          <div className="form-group-checkbox">
            <label htmlFor="isFavorite" className="checkbox-label">
              <input
                type="checkbox"
                id="isFavorite"
                name="isFavorite"
                checked={formData.isFavorite}
                onChange={handleChange}
              />
              <span className="checkbox-text">⭐ Marquer comme favori</span>
            </label>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onCancel}>
              Annuler
            </button>
            <button type="submit" className="btn-primary">
              Ajouter le cours
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseForm;
