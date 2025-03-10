import CTEngine from "./CTEngine";
import { CompuTrabajo } from "../models/CompuTrabajo";

export default class SuperEngine {

    private _html:HTMLElement;

    constructor(html:HTMLElement) {
        this._html = html;
    }
    
    /**
     * Returns and array of CompuTrabajo Objects
     * @returns CompuTrabajo[] 
     */
    public MakeCTJobs(): string[] {

        // Get the HTML Collection of Job Cards
        const ctEngine = new CTEngine();
        const jobCards = ctEngine.getJobHTMLCard(this._html);

        // Get an array of Job Titles
        const jobTitles:string[] = [];

        Array.from(jobCards).forEach((cardJob:Element) => {
            jobTitles.push(ctEngine.getJobTitle(cardJob));
        });

        // Get an array of Job Days

        // Get an array of Job Links

        // Make an array of CompuTrabajo Objects

        // Return the array of CompuTrabajo Objects
        return jobTitles;
    }
}