export class ChileTDomEngine {

    getJobHTMLCard(html:HTMLElement): HTMLCollectionOf<Element> {
        const jobCards = html.getElementsByClassName("job-item");
        return jobCards;
    }

    getJobTitle(cardJob:Element): string {
        const jobTitle:string|null = cardJob.getElementsByTagName("h2")[0].getElementsByTagName("a")[0].textContent;
        return (jobTitle == null) ? "No se obtuvo el titulo" : jobTitle.trim();
    }

    getJobDay(cardJob:Element): string {                //<i class="far"></i>//
        const jobDay:string | null | undefined = cardJob.querySelectorAll("i.far")[0].parentElement?.textContent;
        return (jobDay == null || jobDay == undefined)? "No se obtuvo el dia" : jobDay.trim();
    }

    getJobLink(cardJob:Element): string {
        const jobLink:string|null = cardJob.getElementsByTagName("h2")[0].getElementsByTagName("a")[0].getAttribute("href");
        return (jobLink == null)? "No se obtuvo el link" : jobLink.trim();
    }

}