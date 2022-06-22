import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrillaCursosComponent } from './grilla-cursos/grilla-cursos.component';
import { AgregarCursosComponent } from './agregar-cursos/agregar-cursos.component';
import { ModificarCursosComponent } from './modificar-cursos/modificar-cursos.component';
import { EliminarCursosComponent } from './eliminar-cursos/eliminar-cursos.component';
import { DetalleCursosComponent } from './detalle-cursos/detalle-cursos.component';
import { MaterialModule } from '../material/material.module';
import { CursosRoutingModule } from './cursos.routing.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    GrillaCursosComponent,
    AgregarCursosComponent,
    ModificarCursosComponent,
    EliminarCursosComponent,
    DetalleCursosComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    CursosRoutingModule,
    HttpClientModule
  ],
  exports:[
    GrillaCursosComponent,
    AgregarCursosComponent,
    ModificarCursosComponent,
    EliminarCursosComponent,
    DetalleCursosComponent,
    CursosRoutingModule
  ]
})
export class CursosModule { }
