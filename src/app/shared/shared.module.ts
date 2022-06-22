import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NombrePipe } from './pipes/nombre.pipe';
import { FechaPipe } from './pipes/fecha.pipe';
import { FechaInscripcionesPipe } from './pipes/fecha-inscripciones.pipe';
import { TamanoTituloDirective } from './directives/tamano-titulo.directive';



@NgModule({
  declarations: [
    NombrePipe,
    FechaPipe,
    FechaInscripcionesPipe,
    TamanoTituloDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    NombrePipe,
    FechaPipe,
    FechaInscripcionesPipe,
    TamanoTituloDirective
  ],
  
})
export class SharedModule { }
