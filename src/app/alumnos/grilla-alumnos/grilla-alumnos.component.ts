import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Alumnos } from 'src/app/shared/class/alumnos';
import { AlumnosService } from 'src/app/shared/services/alumnos.service';


@Component({
  selector: 'app-grilla-alumnos',
  templateUrl: './grilla-alumnos.component.html',
  styleUrls: ['./grilla-alumnos.component.scss']
})
export class GrillaAlumnosComponent implements OnInit, OnDestroy {

  alumnos: Alumnos[];
  pageTitle: string = "Listado de Alumnos";
  errorMessage = '';
  sub: Subscription;

  displayedColumns: string[] = ['alumnoNombre', 'alumnoCurso', 'alumnoMail', 'accion'];
  constructor(private serviceAlumnos: AlumnosService) { };

  //Recupero la info del usuario 
  usuario=localStorage.getItem('usuario');

  ngOnInit(): void {
    //Guardo la suscripcion y genero la variable para la grilla
    this.sub = this.serviceAlumnos.getAll().subscribe({
      next: Alumnos => {
        this.alumnos = Alumnos;
      },
      error: err => this.errorMessage = err,
    })
  }

  //Desuscribo
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
