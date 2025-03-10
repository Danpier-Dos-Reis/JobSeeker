import express from 'express';
import cors from 'cors';
import SuperEngine from './LogicLawyer/Engines/SuperEngine';

const app = express();
const port = 3000;

// Habilitar CORS para permitir peticiones desde cualquier origen
app.use(cors({
    // origin: 'http://localhost:4200'  // Cambia esto si el frontend corre en otro dominio
    origin: '0.0.0.0'  // Cambia esto si el frontend corre en otro dominio
}));

app.post('/find_jobs', async (req, res) => {
    const jobsOffers:string[] = ["Ayudante Electricista","Electricista","Vendedor"];
    const superEngine = new SuperEngine();
    
    try {
        // Delete Old Days
        await superEngine.deleteOldDays();

        // Get CompuTrabajo[]
        const allPageContent:HTMLElement[] = await superEngine.searchDuckDuckGo(jobsOffers);
        const ctJobs = superEngine.MakeCTJobs(allPageContent);

        // Insert Jobs
        const insertedRecords:number = await superEngine.insertJobs(ctJobs);

        // res.json({ message: 'Page content fetched successfully' });
        res.json({ message: `It was inserted ${insertedRecords} records` });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch page content' });
    }
});

app.get('/all_records', async (req, res) => {
    const superEngine = new SuperEngine();

    try {
        res.send(await superEngine.getJobRecords());
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch page content' });
    }

});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});