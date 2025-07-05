import React from 'react';
import './ProgressBadge.css';

const ProgressBadge = ({ course }) => {
  const readingProgress = course.readingProgress || 0;
  const understood = course.understood || false;
  const isCompleted = readingProgress === 100 && understood;
  const isInProgress = readingProgress > 0 || understood;

  if (isCompleted) {
    return (
      <div className="progress-badge completed">
        ✅ Terminé
      </div>
    );
  }

  if (isInProgress) {
    return (
      <div className="progress-badge in-progress">
        🔄 En cours ({readingProgress}%)
      </div>
    );
  }

  return (
    <div className="progress-badge not-started">
      ⏳ À commencer
    </div>
  );
};

export default ProgressBadge;
