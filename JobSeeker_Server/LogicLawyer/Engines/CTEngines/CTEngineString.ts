export class CTEngineString {
    deleteHaceWord(jobDay:string): string {
        return jobDay.replace("Hace ", "");
    }

    getHourNumber(jobDay:string): number {
        let aux:string = jobDay.split(" ")[0]; // Take the hour number (is the first word of the string)
        return (!isNaN(parseInt(aux)))? parseInt(aux) : 0;
    }

    getHourWord(jobDay:string): string {
        let aux = jobDay.split(" "); // Take the hour word (is the last word of the string)
        let lastWord = aux[aux.length - 1];
        return lastWord;
    }
}