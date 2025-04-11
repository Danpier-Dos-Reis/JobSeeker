import express from 'express';
import cors from 'cors';
import { supportApp } from './supportApp';
import { Trabajo } from './LogicLawyer/models/Trabajo';

const app = express();
const port = 3000;

// Habilitar CORS para permitir peticiones desde cualquier origen
app.use(cors({
    origin: 'http://localhost:4200'  // Cambia esto si el frontend corre en otro dominio
}));

app.post('/find_jobs', async (req, res) => {

    enum jobPages {
        "https://cl.computrabajo.com/","https://www.chiletrabajos.cl/"
    }
    
    const jobsOffers:string[] = ["Reponedor","Ayudante Electricista","Ayudante Mantenimiento","Cajero","Operario de Bodega"];
    const _supportApp = new supportApp();
    
    let ctJobs:Trabajo[] = [];
    let chileTJobs:Trabajo[] = [];
    
    try {
        // Delete Old Days
        await _supportApp.deleteOldDays();

        for (let key in jobPages) {
            //Computrabajo
            if (key === "0") {
                const wepPage:string = jobPages[0];
                let aux:Trabajo[] = await _supportApp.addCTJobs(wepPage,jobsOffers);
                ctJobs = [...aux];
            }
        }

        //Save Jobs in only one array
        // let allJobs:Trabajo[] = [...ctJobs,...chileTJobs];
        let allJobs:Trabajo[] = [...ctJobs];

        let insertedRecords:number = await _supportApp.insertJobs(allJobs);

        

        // res.json({ message: 'Page content fetched successfully' });
        res.send(`${insertedRecords}`);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch page content' });
    }
});

app.get('/all_records', async (req, res) => {
    const _supportApp = new supportApp();

    try {
        const jobs = await _supportApp.getJobRecords();
        res.send(jobs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch page content' });
    }

});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});