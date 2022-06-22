import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { InicioComponent } from './inicio/inicio.component';
import { CoreRoutingModule } from './core.routing.module';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    SidebarComponent,
    LoginComponent,
    ToolbarComponent,
    InicioComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    MaterialModule
  ],
  exports:[
    SidebarComponent,
    LoginComponent,
    ToolbarComponent,
    InicioComponent,
    CoreRoutingModule
  ]
})
export class CoreModule { }
