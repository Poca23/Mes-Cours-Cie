// src/utils/pdfExport.js
import jsPDF from 'jspdf';

export const generateSingleCoursePDF = (course) => {
  const doc = new jsPDF();
  
  // Configuration
  const margin = 15;
  const pageWidth = doc.internal.pageSize.getWidth();
  let yPosition = margin;
  
  // Titre principal
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('📚 Mes Cours & Cie', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 15;
  
  // Date d'export
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Exporté le ${new Date().toLocaleDateString('fr-FR')}`, pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 20;
  
  // Ligne de séparation
  doc.setLineWidth(0.5);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 15;
  
  // Titre du cours
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(course.title, margin, yPosition);
  yPosition += 15;
  
  // Badge favori
  if (course.isFavorite) {
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('⭐ Cours favori', margin, yPosition);
    yPosition += 10;
  }
  
  // Matière
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(`Matière: `, margin, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.text(course.subject || 'Non spécifiée', margin + 25, yPosition);
  yPosition += 10;
  
  // Date de création
  if (course.createdAt) {
    doc.setFont('helvetica', 'bold');
    doc.text(`Créé le: `, margin, yPosition);
    doc.setFont('helvetica', 'normal');
    doc.text(new Date(course.createdAt).toLocaleDateString('fr-FR'), margin + 25, yPosition);
    yPosition += 15;
  }
  
  // Description
  if (course.description) {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Description:', margin, yPosition);
    yPosition += 10;
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    
    // Découper la description en lignes
    const lines = doc.splitTextToSize(course.description, pageWidth - 2 * margin);
    
    lines.forEach(line => {
      doc.text(line, margin, yPosition);
      yPosition += 6;
    });
  }
  
  // Sauvegarde avec nom du cours
  const fileName = `${course.title.replace(/[^a-zA-Z0-9]/g, '_')}_cours.pdf`;
  doc.save(fileName);
};
