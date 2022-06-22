import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/Guards/auth.guard';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';


const routes: Routes =[
  {
    path:'',
    component: LoginComponent,
  },
  {
      path:'inicio',
      canActivate: [AuthGuard],
      component: InicioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CoreRoutingModule { }