import IJob from "../Interfaces/IJob";

export class Laborum implements IJob {
  Id: number;
  Title: string;
  Day: Date;
  Link: string;

  constructor(id:number,title: string, day: Date, link: string) {
    this.Id = id;
    this.Title = title;
    this.Day = day;
    this.Link = link;
  }
}