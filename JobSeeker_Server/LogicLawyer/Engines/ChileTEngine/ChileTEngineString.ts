export class ChileTEngineString {
    convertStringToJobDate(dateString:string):Date{
        let date:Date = new Date();
        // Mapa de meses en español a número (0-indexado)
        const monthMap: Record<string, number> = {
            "enero": 0,
            "febrero": 1,
            "marzo": 2,
            "abril": 3,
            "mayo": 4,
            "junio": 5,
            "julio": 6,
            "agosto": 7,
            "septiembre": 8,
            "octubre": 9,
            "noviembre": 10,
            "diciembre": 11,
          };

          // Extraer día, mes y año
          const regex = /(\d{1,2}) de (\w+) de (\d{4})/i;
          const match = dateString.match(regex);

          if (match) {
            const day = parseInt(match[1], 10);
            const month = monthMap[match[2].toLowerCase()];
            const year = parseInt(match[3], 10);
        
            date = new Date(year, month, day);
          } else {
            console.error("Formato de fecha no válido");
          }

          return date;
    }
}