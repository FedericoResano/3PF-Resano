import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaInscripciones'
})
export class FechaInscripcionesPipe implements PipeTransform {

 
  transform(dateStr: string): string {

    //para transformar fechas YYYYMMDD a DD/MM/YYYY
    debugger;
    return  dateStr.substring(8, 10) + "/" + dateStr.substring(5, 7) + "/" + dateStr.substring(0, 4);
  }

}
