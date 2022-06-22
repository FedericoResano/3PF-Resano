import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthChildGuard } from '../shared/Guards/auth-child.guard';
import { AuthGuard } from '../shared/Guards/auth.guard';
import { AgregarCursosComponent } from './agregar-cursos/agregar-cursos.component';
import { DetalleCursosComponent } from './detalle-cursos/detalle-cursos.component';
import { EliminarCursosComponent } from './eliminar-cursos/eliminar-cursos.component';
import { GrillaCursosComponent } from './grilla-cursos/grilla-cursos.component';
import { ModificarCursosComponent } from './modificar-cursos/modificar-cursos.component';



const routes: Routes =[
  {
    path: '',
    canActivate: [AuthGuard],
    component: GrillaCursosComponent,
  },
  {
      path:'agregarcurso',
      canActivate: [AuthChildGuard],
      component: AgregarCursosComponent
  },
  {
      path:'editarcurso/:id',
      canActivate: [AuthChildGuard],
      component: ModificarCursosComponent
  },
  {
      path:'eliminarcurso/:id',
      canActivate: [AuthChildGuard],
      component: EliminarCursosComponent
  },
  {
    path:'detallecurso/:id',
    component: DetalleCursosComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CursosRoutingModule { }