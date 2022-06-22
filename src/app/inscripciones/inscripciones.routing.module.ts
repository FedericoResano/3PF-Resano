import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthChildGuard } from '../shared/Guards/auth-child.guard';
import { AuthGuard } from '../shared/Guards/auth.guard';
import { AltaComponent } from './alta/alta.component';
import { BajaComponent } from './baja/baja.component';
import { GrillaInscripcionesComponent } from './grilla-inscripciones/grilla-inscripciones.component';




const routes: Routes =[
  {
    path: '',
    canActivate: [AuthGuard],
    component: GrillaInscripcionesComponent
  },
  {
      path:'alta',
      canActivate: [AuthChildGuard],
      component: AltaComponent
  },
  {
      path:'baja/:id',
      canActivate: [AuthChildGuard],
      component: BajaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class InscripcionesRoutingModule { }