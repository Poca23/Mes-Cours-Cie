// src/components/SearchBar.js
import React, { useState, useEffect, useCallback } from 'react';
import './SearchBar.css';

const SearchBar = ({ courses, onFilteredCourses }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Extraire les matières uniques
  const uniqueSubjects = [...new Set(courses.map(course => course.subject))];

  // Utiliser useCallback pour éviter les dépendances infinies
  const filterCourses = useCallback(() => {
    let filtered = courses;

    // Filtrer par terme de recherche
    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.subject.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrer par matière
    if (selectedSubject) {
      filtered = filtered.filter(course => course.subject === selectedSubject);
    }

    // Filtrer par favoris
    if (showFavoritesOnly) {
      filtered = filtered.filter(course => course.isFavorite);
    }

    onFilteredCourses(filtered);
  }, [courses, searchTerm, selectedSubject, showFavoritesOnly, onFilteredCourses]);

  useEffect(() => {
    filterCourses();
  }, [filterCourses]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedSubject('');
    setShowFavoritesOnly(false);
  };

  const hasActiveFilters = searchTerm || selectedSubject || showFavoritesOnly;

  return (
    <div className="search-bar">
      <div className="search-bar-header">
        <h3>🔍 Rechercher et filtrer</h3>
        {hasActiveFilters && (
          <button className="btn-clear-filters" onClick={clearFilters}>
            ✕ Effacer les filtres
          </button>
        )}
      </div>

      <div className="search-controls">
        <div className="search-input-group">
          <input
            type="text"
            placeholder="Rechercher dans les cours..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="filter-controls">
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="subject-filter"
          >
            <option value="">Toutes les matières</option>
            {uniqueSubjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>

          <label className="favorites-filter">
            <input
              type="checkbox"
              checked={showFavoritesOnly}
              onChange={(e) => setShowFavoritesOnly(e.target.checked)}
            />
            <span>⭐ Favoris uniquement</span>
          </label>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="active-filters">
          <span className="filter-label">Filtres actifs :</span>
          {searchTerm && (
            <span className="filter-tag">
              Recherche: "{searchTerm}"
              <button onClick={() => setSearchTerm('')}>×</button>
            </span>
          )}
          {selectedSubject && (
            <span className="filter-tag">
              Matière: {selectedSubject}
              <button onClick={() => setSelectedSubject('')}>×</button>
            </span>
          )}
          {showFavoritesOnly && (
            <span className="filter-tag">
              ⭐ Favoris
              <button onClick={() => setShowFavoritesOnly(false)}>×</button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
