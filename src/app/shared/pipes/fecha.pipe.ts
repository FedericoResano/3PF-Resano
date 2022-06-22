import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {

  transform(dateStr: string): string {

    //para transformar fechas YYYYMMDD a DD/MM/YYYY
    debugger;
    return  dateStr.substring(2, 4) + "-" + dateStr.substring(0, 2) + "-" + dateStr.substring(4, 8);


}

}
