import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrillaAlumnosComponent } from './grilla-alumnos/grilla-alumnos.component';
import { AgregarAlumnosComponent } from './agregar-alumnos/agregar-alumnos.component';
import { ModificarAlumnosComponent } from './modificar-alumnos/modificar-alumnos.component';
import { EliminarAlumnosComponent } from './eliminar-alumnos/eliminar-alumnos.component';
import { AlumnosRoutingModule } from './alumnos.routing.module';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { DetallesAlumnosComponent } from './detalles-alumnos/detalles-alumnos.component';



@NgModule({
  declarations: [
    GrillaAlumnosComponent,
    AgregarAlumnosComponent,
    ModificarAlumnosComponent,
    EliminarAlumnosComponent,
    DetallesAlumnosComponent
    
  ],
  imports: [
    CommonModule,
    AlumnosRoutingModule, 
    MaterialModule,
    SharedModule,
    HttpClientModule
  ],
  exports:[
    GrillaAlumnosComponent,
    AgregarAlumnosComponent,
    ModificarAlumnosComponent,
    EliminarAlumnosComponent,
    DetallesAlumnosComponent,
    AlumnosRoutingModule
  ]
})
export class AlumnosModule { }
