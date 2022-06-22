import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  {
    path:'',
    loadChildren: () => import('./core/core.module').then(m => m.CoreModule)
  },
  {
    path:'alumnos',
    loadChildren: () => import('./alumnos/alumnos.module').then(m => m.AlumnosModule)
  },
  {
    path:'cursos',
    loadChildren: () => import('./cursos/cursos.module').then(m => m.CursosModule)
  },
  {
    path:'inscripciones',
    loadChildren: () => import('./inscripciones/inscripciones.module').then(m => m.InscripcionesModule)
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
