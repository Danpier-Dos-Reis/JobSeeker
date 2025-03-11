import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsTableComponent } from './jobs-table/jobs-table.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,JobsTableComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  async findJobs() {
    const response = await fetch("http://localhost:3000/find_jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const recordsInserted = await response.text();
    window.alert(`It was inserted ${recordsInserted} new records`);
  }
}