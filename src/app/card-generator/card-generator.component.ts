import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-card-generator',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './card-generator.component.html',
  styleUrls: ['./card-generator.component.css']
})
export class CardGeneratorComponent {
  guestName: string = '';

  // Function to sanitize the guest name to avoid invalid filename characters
  sanitizeFileName(name: string): string {
    return name.replace(/[^a-z0-9]/gi, '_').toUpperCase();
  }

  downloadAsPDF() {
    const cardElement = document.getElementById('card') as HTMLElement;

    html2canvas(cardElement, {
      scale: 3,
      useCORS: true
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF('landscape', 'px', [842, 595]);
      const imgWidth = 842;
      const imgHeight = canvas.height * (imgWidth / canvas.width);
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

      // Use the sanitized guest name as the PDF file name
      const fileName = this.sanitizeFileName(this.guestName) || 'guest_card';
      pdf.save(`${fileName}.pdf`);
    });
  }

  downloadAsImage() {
    const cardElement = document.getElementById('card') as HTMLElement;

    html2canvas(cardElement, {
      scale: 3,
      useCORS: true
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.href = imgData;

      // Use the sanitized guest name as the image file name
      const fileName = this.sanitizeFileName(this.guestName) || 'guest_card';
      link.download = `${fileName}.png`;
      link.click();
    });
  }
}
