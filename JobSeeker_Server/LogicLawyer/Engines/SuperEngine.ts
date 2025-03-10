import { CTEngine, CTDomEngine } from "./CTEngine";
import DAL from "../../DAL/DAL";
import { Builder, By, error, Key } from 'selenium-webdriver';
import { SanitizeEngine } from "./SanitizeEngine";
import { CompuTrabajo } from "../models/CompuTrabajo";

export default class SuperEngine {

    private soundPath = 'C:\\Users\\Dan\\Desktop\\Projects\\JobSeeker\\JobSeeker_Server\\assets\\sound.wav';
    private dal = new DAL("./Database/database.db");
    private sanitizer = new SanitizeEngine();
    
    /**
     * Returns and array of CompuTrabajo Objects
     * @returns CompuTrabajo[] 
     */
    public MakeCTJobs(html:HTMLElement[]): CompuTrabajo[] {

        // Task 1: Get the HTML Collection of Job Cards
        const ctEngine = new CTEngine();
        const ctDomEngine = new CTDomEngine();

        // Task 2: Get an array of Job Titles, job Days and job Links
        const jobTitles:string[] = [];
        const stringJobDays:string[] = [];
        const jobLinks:string[] = [];

        html.forEach((page) => {

            // Task 1
            const jobCards = ctDomEngine.getJobHTMLCard(page);

            // Task 2
            Array.from(jobCards).forEach((cardJob:Element) => {
                jobTitles.push(ctDomEngine.getJobTitle(cardJob));
                stringJobDays.push(ctDomEngine.getJobDay(cardJob));
                jobLinks.push("https://cl.computrabajo.com" + ctDomEngine.getJobLink(cardJob));
            });
        });

        // Make an array of Job Days
        const jobDays:Date[] = ctEngine.getArrayOfJobDays(stringJobDays);

        // Make an array of CompuTrabajo Objects
        let ctJobs:CompuTrabajo[] = ctEngine.getArrayOfCTJobs(jobTitles,jobDays,jobLinks);
        
        return ctJobs;
    }

    /**
     * Open firefox to find jobs in CompuTrabajo.com
     * @returns HTMLElement[]
     */
    async searchDuckDuckGo(jobsOffers:string[]): Promise<HTMLElement[]> {

        const driver = await new Builder()
            .forBrowser('firefox')
            .build();
    
        let pageContent = '';
        let allPageContent:HTMLElement[] = [];
    
        try {

            for (let i = 0; i < jobsOffers.length; i++) {
                await driver.get('https://cl.computrabajo.com/');
                const searchBox = await driver.findElement(By.id("prof-cat-search-input"));
                await searchBox.sendKeys(jobsOffers[i], Key.RETURN);
                await driver.sleep(10000);
                pageContent = await driver.findElement(By.tagName('body')).getAttribute('innerHTML');

                const dom = this.sanitizer.ConvertToSanitizedHtml(pageContent);
                allPageContent.push(dom.body);
            }
    
        } catch (error) {
            console.error('An error occurred:', error);
        } finally {
            setTimeout(() => {
                driver.quit();
            }, 10000);
        }
        return allPageContent;
    }

    /**
     * Returns a JSON string of the Job Records
     * @returns string
    */
    async getJobRecords(): Promise<string> {
        return await this.dal.getJobRecords();
    }

    async insertJobs(ctJobs:CompuTrabajo[]): Promise<number> {
        const bRecords:number = await this.dal.getJobCount();
        try {
            for (let i = 0; i < ctJobs.length; i++) {
                await this.dal.insertJobs(ctJobs[i].Title, ctJobs[i].Day, ctJobs[i].Link);
            }
        } catch (error) {
            console.error("Error inserting data:", error);
        }
        const aRecords:number = await this.dal.getJobCount();

        return (aRecords - bRecords);
    }

    async  deleteOldDays(): Promise<void> {
        await this.dal.deleteOldDays();
    }

}