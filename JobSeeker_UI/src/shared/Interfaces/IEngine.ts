export default interface IEngine {
    getJobHTMLCard(html:HTMLElement): HTMLCollectionOf<Element>;
    getJobTitle(cardJob:Element): string;
    getJobDay(cardJob:Element): Date;
    getJobLink(cardJob:Element): string;
}