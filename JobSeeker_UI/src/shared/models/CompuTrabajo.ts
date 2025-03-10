import IJob from "../Interfaces/IJob";

export class CompuTrabajo implements IJob {
  Title: string;
  Day: Date;
  Link: string;

  constructor(title: string, day: Date, link: string) {
    this.Title = title;
    this.Day = day;
    this.Link = link;
  }
}