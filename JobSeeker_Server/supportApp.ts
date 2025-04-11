import SuperEngine from './LogicLawyer/Engines/SuperEngine';
import { Trabajo } from './LogicLawyer/models/Trabajo';

export class supportApp {

    private _superEngine = new SuperEngine();

    public async getJobRecords():Promise<string> {
        const jobs = await this._superEngine.getJobRecords();
        return jobs;
    }

    public async deleteOldDays(){ this._superEngine.deleteOldDays(); }

    public async insertJobs(jobs:Trabajo[]):Promise<number>{
        const insertedRecords:number = await this._superEngine.insertJobs(jobs);
        return insertedRecords;
    }

    public async addCTJobs(webPage:string,jobsOffers:string[]):Promise<Trabajo[]>{
        const allPageContent:HTMLElement[] = await this._superEngine.searchDuckDuckGo(webPage,jobsOffers);
        const arrayJobs:Trabajo[] = this._superEngine.MakeCTJobs(allPageContent);
        return arrayJobs;
    }
}