export class ChileTEngineString {
  convertStringToJobDate(fechaStr: string): Date {
    const meses: { [key: string]: number } = {
      'Enero': 0,
      'Febrero': 1,
      'Marzo': 2,
      'Abril': 3,
      'Mayo': 4,
      'Junio': 5,
      'Julio': 6,
      'Agosto': 7,
      'Septiembre': 8,
      'Octubre': 9,
      'Noviembre': 10,
      'Diciembre': 11,
    };
  
    const partes = fechaStr.trim().split(' de ');
    const dia = parseInt(partes[0], 10);
    const mes = meses[partes[1].trim()];
    const anio = parseInt(partes[2], 10);
  
    return new Date(anio, mes, dia);
  }
}