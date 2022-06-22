import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  usuario=localStorage.getItem('usuario');
  constructor() { }

  ngOnInit(): void {
  }

  cerrarSesion(){
    localStorage.clear();
  }

}
