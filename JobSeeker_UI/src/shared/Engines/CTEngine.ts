//CompuTrabajo Engine Class
import IEngine from "../Interfaces/IEngine"

export default class CTEngine implements IEngine {

    getJobHTMLCard(html:HTMLElement): HTMLCollectionOf<Element> {
        const job = html.getElementsByClassName("box_offer");
        return job;
    }

    getJobTitle(cardJob:Element): string {
        const jobTitle:string|null = cardJob.getElementsByTagName("h2")[0].getElementsByTagName("a")[0].textContent;
        return (jobTitle == null) ? "No se obtuvo el titulo" : jobTitle.trim();
    }

    getJobDay(cardJob:Element): Date {
        return new Date();
    }

    getJobLink(cardJob:Element): string {
        return "";
    }

}