import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cursos } from 'src/app/shared/class/cursos';
import { CursosService } from 'src/app/shared/services/cursos.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-grilla-cursos',
  templateUrl: './grilla-cursos.component.html',
  styleUrls: ['./grilla-cursos.component.scss']
})
export class GrillaCursosComponent implements OnInit, OnDestroy {
  cursos: Cursos[];
  pageTitle: string = "Listado de Cursos";
  errorMessage = '';
  sub: Subscription

  displayedColumns: string[] = ['curso', 'duracion', 'precio', 'accion'];
  constructor(private serviceCursos: CursosService) { };

  //Recupero la info del usuario 
  usuario=localStorage.getItem('usuario');

  ngOnInit(): void {

    //GUardo la suscripcion y lleno la variable para la grilla
    this.sub = this.serviceCursos.getAll().subscribe({
      next: Cursos => {
        this.cursos = Cursos;
      },
      error: err => this.errorMessage = err,
    })
  }

  //Desuscribo
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


}