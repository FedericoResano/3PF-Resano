import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthChildGuard } from '../shared/Guards/auth-child.guard';
import { AuthGuard } from '../shared/Guards/auth.guard';
import { AgregarAlumnosComponent } from './agregar-alumnos/agregar-alumnos.component';
import { DetallesAlumnosComponent } from './detalles-alumnos/detalles-alumnos.component';
import { EliminarAlumnosComponent } from './eliminar-alumnos/eliminar-alumnos.component';
import { GrillaAlumnosComponent } from './grilla-alumnos/grilla-alumnos.component';
import { ModificarAlumnosComponent } from './modificar-alumnos/modificar-alumnos.component';


const routes: Routes = [

    {
        path: '',
        canActivate: [AuthGuard],
        component: GrillaAlumnosComponent
      },
    {
        path: 'agregaralumno',
        canActivate: [AuthChildGuard],
        component: AgregarAlumnosComponent
    },
    {
        path: 'editaralumno/:id',
        canActivate: [AuthChildGuard],
        component: ModificarAlumnosComponent
    },
    {
        path: 'eliminaralumno/:id',
        canActivate: [AuthChildGuard],
        component: EliminarAlumnosComponent
    },
    {
        path: 'detallealumno/:id',
        component: DetallesAlumnosComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AlumnosRoutingModule { }