import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompuTrabajo } from '../../../shared/models/CompuTrabajo';
import Engine from '../../../shared/Engine/Engine';


@Component({
  selector: 'app-jobs-table',
  imports: [CommonModule],
  templateUrl: './jobs-table.component.html',
  styleUrl: './jobs-table.component.css'
})
export class JobsTableComponent implements OnInit  {

  engine = new Engine();
  jobs:CompuTrabajo[] = [];

  async getJobs() {
    const response = await fetch("http://localhost:3000/all_records", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    this.jobs = this.engine.convertToCTObjects(await response.text());
  }

  ngOnInit(): void {
      //assing space to rows
  }
}
