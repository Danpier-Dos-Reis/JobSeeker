//CompuTrabajo Engine Class
import { Trabajo } from "../../models/Trabajo";
import { CTEngineString } from "./CTEngineString";

export class CTEngine {

    ctEngineString = new CTEngineString();

    /**
     * This function chage the string "Hace X minutos/horas" to a Date[]
     * @param stringJobDays 
     * @returns Date[]
     */
    getArrayOfJobDays(stringJobDays:string[]): Date[] {
        
        let aux:Date[] = [];
        stringJobDays.forEach((day) => {
             let sentence = this.ctEngineString.deleteHaceWord(day);
             let hours:number = this.ctEngineString.getHourNumber(sentence);
             let lastWord:string = this.ctEngineString.getHourWord(sentence);

             switch (lastWord) {
                case "minuto":
                    aux.push(new Date(Date.now()));
                    break;
                case "minutos":
                    aux.push(new Date(Date.now()));
                    break;
                case "hora":
                    aux.push(new Date(Date.now()));
                    break;
                case "horas":
                    if (hours < 6) {
                        aux.push(new Date(Date.now()));
                    } else {
                        aux.push(new Date("1999-01-01T00:00:00"));
                    }
                    break;
                default:
                    aux.push(new Date("1999-01-01T00:00:00"));
                    break;
             }
        });
        return aux;
    }

    /**
     * This function return an array of CompuTrabajo Objects That was posted in the last 6 hours
     * @param jobTitles
     * @param jobDays
     * @param jobLinks
     * @returns CompuTrabajo[]
     */
    getArrayOfCTJobs(jobTitles: string[],jobDays: Date[],jobLinks: string[]):Trabajo[] {

        let ctAux:Trabajo[] = [];

        let numb:number = jobTitles.length;
        for (let i = 0;i < numb;i++) {
            const job = new Trabajo(jobTitles[i],jobDays[i],jobLinks[i]);
            ctAux.push(job);
        }

        // Delete Jobs from other years
        let ctJobs:Trabajo[] = [];
        ctAux.forEach((job) => {
            if (job.Day.getFullYear() != 1999) {
                ctJobs.push(job);
            }
        });
        return ctJobs;
    }

}