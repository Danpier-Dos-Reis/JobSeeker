//CompuTrabajo Engine Class
import { CompuTrabajo } from "../models/CompuTrabajo";

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
    getArrayOfCTJobs(jobTitles: string[],jobDays: Date[],jobLinks: string[]):CompuTrabajo[] {

        let ctAux:CompuTrabajo[] = [];

        let numb:number = jobTitles.length;
        for (let i = 0;i < numb;i++) {
            const job = new CompuTrabajo(jobTitles[i],jobDays[i],jobLinks[i]);
            ctAux.push(job);
        }

        // Delete Jobs from other years
        let ctJobs:CompuTrabajo[] = [];
        ctAux.forEach((job) => {
            if (job.Day.getFullYear() != 1999) {
                ctJobs.push(job);
            }
        });
        return ctJobs;
    }

}

export class CTDomEngine {

    getJobHTMLCard(html:HTMLElement): HTMLCollectionOf<Element> {
        const job = html.getElementsByClassName("box_offer");
        return job;
    }

    getJobTitle(cardJob:Element): string {
        const jobTitle:string|null = cardJob.getElementsByTagName("h2")[0].getElementsByTagName("a")[0].textContent;
        return (jobTitle == null) ? "No se obtuvo el titulo" : jobTitle.trim();
    }

    getJobDay(cardJob:Element): string {
        const jobDay:string|null = cardJob.querySelectorAll("p.fs13")[0].textContent;
        return (jobDay == null)? "No se obtuvo el dia" : jobDay.trim();
    }

    getJobLink(cardJob:Element): string {
        const jobLink:string|null = cardJob.getElementsByTagName("h2")[0].getElementsByTagName("a")[0].getAttribute("href");
        return (jobLink == null)? "No se obtuvo el link" : jobLink.trim();
    }

}

export class CTEngineString {
    deleteHaceWord(jobDay:string): string {
        return jobDay.replace("Hace ", "");
    }

    getHourNumber(jobDay:string): number {
        let aux:string = jobDay.split(" ")[0]; // Take the hour number (is the first word of the string)
        return (!isNaN(parseInt(aux)))? parseInt(aux) : 0;
    }

    getHourWord(jobDay:string): string {
        let aux = jobDay.split(" "); // Take the hour word (is the last word of the string)
        let lastWord = aux[aux.length - 1];
        return lastWord;
    }
}