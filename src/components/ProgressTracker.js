import React from 'react';
import { updateCourseProgress } from '../utils/storage';
import './ProgressTracker.css';

const ProgressTracker = ({ course, onUpdate }) => {
  const handleProgressChange = (field, value) => {
    const updatedCourse = updateCourseProgress(course.id, {
      [field]: value
    });
    if (updatedCourse && onUpdate) {
      onUpdate(updatedCourse);
    }
  };

  const progressPercentage = Math.min(
    (course.readingProgress || 0) + (course.understood ? 20 : 0), 
    100
  );

  return (
    <div className="progress-tracker">
      <h4>📊 Progression du cours</h4>
      
      <div className="progress-section">
        <label>📖 Lecture :</label>
        <div className="progress-input">
          <input
            type="range"
            min="0"
            max="100"
            value={course.readingProgress || 0}
            onChange={(e) => handleProgressChange('readingProgress', parseInt(e.target.value))}
          />
          <span className="progress-value">{course.readingProgress || 0}%</span>
        </div>
      </div>

      <div className="progress-section">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={course.understood || false}
            onChange={(e) => handleProgressChange('understood', e.target.checked)}
          />
          <span>✅ Compris et maîtrisé</span>
        </label>
      </div>

      <div className="progress-summary">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <span className="progress-text">
          Progression globale : {progressPercentage}%
        </span>
      </div>
    </div>
  );
};

export default ProgressTracker;
