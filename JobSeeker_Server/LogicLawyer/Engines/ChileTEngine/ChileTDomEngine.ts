export class ChileTDomEngine {

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