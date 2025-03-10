import { open, Database } from "sqlite";
import sqlite3 from "sqlite3";

export default class DAL {
    private dbPath: string;
    private dbConnection?: Database;

    constructor(path: string) {
        this.dbPath = path;
    }

    private async connect(): Promise<Database> {
        if (!this.dbConnection) {
            this.dbConnection = await open({
                filename: this.dbPath,
                driver: sqlite3.Database,
            });
        }
        return this.dbConnection;
    }

    async createJobTable(): Promise<void> {
        try {
            const db = await this.connect();
            const query = `
                CREATE TABLE IF NOT EXIST Job (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    Title TEXT NOT NULL,
                    Day DATETIME NOT NULL,
                    Link TEXT NOT NULL
                );
            `;
            await db.exec(query);
        } catch (error) {
            console.error("Error creating table:", error);
        } finally {
            await this.Close();
        }
    }

    async deleteOldDays(): Promise<void> {
        try {
            const db = await this.connect();
            const query = `DELETE FROM Job WHERE date(Day) < DATE('now', 'localtime')`;
            await db.run(query);
        } catch (error) {
            console.error("Error deleting old records:", error);
        } finally {
            await this.Close();
        }
    }

    /**
     * Insert Jobs that wasn't registered into the DB
     * @param title 
     * @param day 
     * @param link 
     */
    async insertJobs(title: string, day: Date, link: string): Promise<void> {
        try {
            const db = await this.connect();
            const query = `
                INSERT INTO Job (Title, Day, Link)
                SELECT ?, ?, ?
                WHERE NOT EXISTS (
                    SELECT 1 
                    FROM Job 
                    WHERE Link = ?
                );`;
            await db.run(query, [title, day, link, link]);
        } catch (error) {
            console.error("Error inserting data:", error);
        }
    }

    async getJobRecords(): Promise<string> {
        try {
            const db = await this.connect();
            const query = `SELECT Id, Title, Day, Link FROM Job`;
            const rows = await db.all(query);
            return JSON.stringify(rows);
        } catch (error) {
            console.error("Error fetching data:", error);
            return "[]";
        } finally {
            await this.Close();
        }
    }

    async getJobCount(): Promise<number> {
        try {
            const db = await this.connect();
            const query = `SELECT COUNT(*) as count FROM Job`;
            const result = await db.get(query);
            return result.count;
        } catch (error) {
            console.error("Error counting records:", error);
            return 0;
        }
    }

    async Close(): Promise<void> {
        if (this.dbConnection) {
            await this.dbConnection.close();
            this.dbConnection = undefined;
        }
    }
}
