import { Trabajo } from "../../models/Trabajo";
import { ChileTEngineString } from "./ChileTEngineString";

export class ChileTEngine {

    private _chileTEngineString = new ChileTEngineString();

    /**
     * This function change each string "00 de °mounth° de °year°" to a Date
     * @param stringJobDays 
     * @returns Date[]
     */
    getArrayOfJobDays(stringJobDays:string[]): Date[] {
        
        let date:Date[] = [];
        stringJobDays.forEach((day) => {
             date.push(this._chileTEngineString.convertStringToJobDate(day));
        });
        return date;
    }

    /**
     * This function return an array of CompuTrabajo Objects That was posted today
     * @param jobTitles
     * @param jobDays
     * @param jobLinks
     * @returns CompuTrabajo[]
     */
    getArrayOfChileTJobs(jobTitles: string[],jobDays: Date[],jobLinks: string[]):Trabajo[] {

        let chileTAux:Trabajo[] = [];

        let numb:number = jobTitles.length;
        for (let i = 0;i < numb;i++) {
            const job = new Trabajo(jobTitles[i],jobDays[i],jobLinks[i]);
            chileTAux.push(job);
        }

        // Delete Jobs from other days
        let chileTJobs:Trabajo[] = [];
        chileTAux.forEach((job) => {
            if (job.Day.getDate() === new Date().getDate()) {
                chileTJobs.push(job);
            }
        });
        return chileTJobs;
    }

}