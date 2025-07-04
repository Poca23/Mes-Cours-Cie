// src/components/ExportButton.js
import React, { useState } from 'react';
import jsPDF from 'jspdf';
import './ExportButton.css';

const ExportButton = ({ courses, filteredCourses }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportOptions, setExportOptions] = useState({
    includeAll: false,
    includeFavorites: false,
    includeDescriptions: true,
    includeDates: true
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const generatePDF = () => {
    setIsExporting(true);
    
    try {
      const doc = new jsPDF();
      
      // Données à exporter
      let coursesToExport = [...filteredCourses];
      
      if (exportOptions.includeAll) {
        coursesToExport = [...courses];
      } else if (exportOptions.includeFavorites) {
        coursesToExport = courses.filter(course => course.isFavorite);
      }

      // En-tête du document
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text('📚 Mes Cours & Cie', 20, 20);
      
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`Exporté le ${formatDate(new Date())}`, 20, 30);
      doc.text(`Nombre de cours: ${coursesToExport.length}`, 20, 40);

      // Ligne de séparation
      doc.setLineWidth(0.5);
      doc.line(20, 45, 190, 45);

      let yPosition = 55;
      const pageHeight = doc.internal.pageSize.height;
      
      coursesToExport.forEach((course, index) => {
        // Vérifier si on a besoin d'une nouvelle page
        if (yPosition > pageHeight - 40) {
          doc.addPage();
          yPosition = 20;
        }

        // Titre du cours
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text(`${index + 1}. ${course.title}`, 20, yPosition);
        yPosition += 8;

        // Matière et favori
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        const favoriteText = course.isFavorite ? ' ⭐' : '';
        doc.text(`Matière: ${course.subject}${favoriteText}`, 25, yPosition);
        yPosition += 6;

        // Date si demandée
        if (exportOptions.includeDates) {
          doc.text(`Créé le: ${formatDate(course.createdAt)}`, 25, yPosition);
          yPosition += 6;
        }

        // Description si demandée
        if (exportOptions.includeDescriptions && course.description) {
          doc.setFontSize(9);
          const splitDescription = doc.splitTextToSize(course.description, 160);
          doc.text(splitDescription, 25, yPosition);
          yPosition += splitDescription.length * 4 + 5;
        }

        // Espacement entre les cours
        yPosition += 5;

        // Ligne de séparation
        if (index < coursesToExport.length - 1) {
          doc.setLineWidth(0.2);
          doc.line(25, yPosition, 185, yPosition);
          yPosition += 10;
        }
      });

      // Pied de page sur la dernière page
      const totalPages = doc.internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'italic');
        doc.text(`Page ${i} sur ${totalPages}`, 20, pageHeight - 10);
        doc.text('Généré par Mes Cours & Cie', 120, pageHeight - 10);
      }

      // Télécharger le PDF
      const fileName = `mes-cours-${new Date().toISOString().slice(0, 10)}.pdf`;
      doc.save(fileName);
      
      console.log(`✅ PDF exporté: ${fileName}`);
      
    } catch (error) {
      console.error('❌ Erreur lors de l\'export PDF:', error);
      alert('Erreur lors de l\'export PDF. Veuillez réessayer.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="export-section">
      <div className="export-header">
        <h3>📄 Exporter en PDF</h3>
        <p>Téléchargez vos cours au format PDF</p>
      </div>

      <div className="export-options">
        <div className="export-scope">
          <h4>Cours à exporter :</h4>
          <label className="export-option">
            <input
              type="radio"
              name="exportScope"
              checked={!exportOptions.includeAll && !exportOptions.includeFavorites}
              onChange={() => setExportOptions(prev => ({
                ...prev,
                includeAll: false,
                includeFavorites: false
              }))}
            />
            <span>Résultats actuels ({filteredCourses.length} cours)</span>
          </label>
          
          <label className="export-option">
            <input
              type="radio"
              name="exportScope"
              checked={exportOptions.includeAll}
              onChange={() => setExportOptions(prev => ({
                ...prev,
                includeAll: true,
                includeFavorites: false
              }))}
            />
            <span>Tous les cours ({courses.length} cours)</span>
          </label>
          
          <label className="export-option">
            <input
              type="radio"
              name="exportScope"
              checked={exportOptions.includeFavorites}
              onChange={() => setExportOptions(prev => ({
                ...prev,
                includeAll: false,
                includeFavorites: true
              }))}
            />
            <span>Favoris uniquement ({courses.filter(c => c.isFavorite).length} cours)</span>
          </label>
        </div>

        <div className="export-content">
          <h4>Contenu à inclure :</h4>
          <label className="export-option">
            <input
              type="checkbox"
              checked={exportOptions.includeDescriptions}
              onChange={(e) => setExportOptions(prev => ({
                ...prev,
                includeDescriptions: e.target.checked
              }))}
            />
            <span>Descriptions des cours</span>
          </label>
          
          <label className="export-option">
            <input
              type="checkbox"
              checked={exportOptions.includeDates}
              onChange={(e) => setExportOptions(prev => ({
                ...prev,
                includeDates: e.target.checked
              }))}
            />
            <span>Dates de création</span>
          </label>
        </div>
      </div>

      <button
        className="btn-export"
        onClick={generatePDF}
        disabled={isExporting}
      >
        {isExporting ? (
          <>🔄 Export en cours...</>
        ) : (
          <>📄 Télécharger PDF</>
        )}
      </button>
    </div>
  );
};

export default ExportButton;
