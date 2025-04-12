import { CTEngine } from './CTEngines/CTEngine';
import { CTDomEngine } from './CTEngines/CTDomEngine';
import {ChileTEngine} from './ChileTEngine/ChileTEngine';
import { ChileTDomEngine } from './ChileTEngine/ChileTDomEngine';

import DAL from "../../DAL/DAL";
import { Builder, By, Key } from 'selenium-webdriver';
import { SanitizeEngine } from "./SanitizeEngine";
import { Trabajo } from "../models/Trabajo";

export default class SuperEngine {
    private dal = new DAL("./Database/database.db");
    private sanitizer = new SanitizeEngine();

    /**
     * Open firefox to find jobs
     * @returns HTMLElement[]
     */
    async searchDuckDuckGo(webPage:string,jobsOffers:string[]): Promise<HTMLElement[]> {

        let idName = "";
        if (webPage === "https://cl.computrabajo.com/") {
            idName = "prof-cat-search-input";
        } else if (webPage === "https://www.chiletrabajos.cl/") {
            idName = "frm-landingPage1-email";
        }

        const driver = await new Builder()
            .forBrowser('firefox')
            .build();
    
        let pageContent = '';
        let allPageContent:HTMLElement[] = [];
    
        try {

            for (let i = 0; i < jobsOffers.length; i++) {
                await driver.get(webPage);
                const searchBox = await driver.findElement(By.id(idName));
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

    //#region Page Functions

    /**
     * Returns and array of Trabajo Objects from ChileTrabajos
     * @returns Trabajo[] 
     */
    public MakeChileTJobs(html:HTMLElement[]): Trabajo[] {

        // Task 1: Get the HTML Collection of Job Cards
        const chileTEngine = new ChileTEngine();
        const chileTDomEngine = new ChileTDomEngine();

        // Task 2: Get an array of Job Titles, job Days and job Links
        const jobTitles:string[] = [];
        const stringJobDays:string[] = [];
        const jobLinks:string[] = [];

        html.forEach((page) => {

            // Task 1
            const jobCards = chileTDomEngine.getJobHTMLCard(page);

            // Task 2
            Array.from(jobCards).forEach((cardJob:Element) => {
                jobTitles.push(chileTDomEngine.getJobTitle(cardJob));
                stringJobDays.push(chileTDomEngine.getJobDay(cardJob));
                jobLinks.push(chileTDomEngine.getJobLink(cardJob));
            });
        });

        // Make an array of Job Days
        const jobDays:Date[] = chileTEngine.getArrayOfJobDays(stringJobDays);

        // Make an array of ChileTrabajos Objects
        let chileTJobs:Trabajo[] = chileTEngine.getArrayOfChileTJobs(jobTitles,jobDays,jobLinks);
        
        return chileTJobs;
    }

    /**
     * Returns and array of Trabajo Objects from Computrabajo
     * @returns Trabajo[] 
     */
    public MakeCTJobs(html:HTMLElement[]): Trabajo[] {

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
        let ctJobs:Trabajo[] = ctEngine.getArrayOfCTJobs(jobTitles,jobDays,jobLinks);
        
        return ctJobs;
    }

    //#endregion

    //#region DataBase Functions

    /**
     * Returns a JSON string of the Job Records
     * @returns string
    */
    async getJobRecords(): Promise<string> {
        return await this.dal.getJobRecords();
    }

    async insertJobs(ctJobs:Trabajo[]): Promise<number> {
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

    //#endregion

}