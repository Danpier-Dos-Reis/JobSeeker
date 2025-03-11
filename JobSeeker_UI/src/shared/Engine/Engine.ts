import { CompuTrabajo } from "../models/CompuTrabajo";

export default class Engine {

    public convertToCTObjects(json: string): CompuTrabajo[] {
        let ctJobs: CompuTrabajo[] = [];
        const jobs = JSON.parse(json);
        
        for (let job of jobs) {
            let Job = new CompuTrabajo(job.Id,job.Title,new Date(job.Day),job.Link);
            ctJobs.push(Job);
        }
        return ctJobs;
    }

}