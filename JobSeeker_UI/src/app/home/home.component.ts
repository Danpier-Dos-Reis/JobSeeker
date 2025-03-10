import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import SuperEngine from '../../shared/Engines/SuperEngine';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  pageContent: SafeHtml = ''; // Almacena HTML seguro


  constructor(private sanitizer: DomSanitizer) {}

  async onRunBot() {
    const response = await fetch("http://localhost:3000/run", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const rawHtml = await response.text();

    // Parsear el HTML a un documento real
    const parser = new DOMParser();
    const doc = parser.parseFromString(rawHtml, "text/html");

    // Ahora puedes acceder a los elementos del HTML
    const body = doc.body;

    //Manejar CompuTrabajo
    const superEngine = new SuperEngine(body);

    Array.from(superEngine.MakeCTJobs()).forEach((job) => {
      console.log(job);
    });

    // this.pageContent = this.sanitizer.bypassSecurityTrustHtml(rawHtml);
  }
}