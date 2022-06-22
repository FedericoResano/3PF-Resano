import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Inscripciones } from 'src/app/shared/class/inscripciones';
import { InscripcionesService } from 'src/app/shared/services/inscripciones.service';


@Component({
  selector: 'app-grilla-inscripciones',
  templateUrl: './grilla-inscripciones.component.html',
  styleUrls: ['./grilla-inscripciones.component.scss']
})
export class GrillaInscripcionesComponent implements OnInit, OnDestroy {
  usuario=localStorage.getItem('usuario');
  inscripciones: Inscripciones[];
  pageTitle: string = "Listado de Inscripciones";
  errorMessage = '';
  sub: Subscription

  displayedColumns: string[] = ['alumno', 'curso', 'fechaInicio', 'accion'];
  constructor(private serviceCursos: InscripcionesService) { };


  //Guardo la sub y traigo los datos para armar la tabla.
  ngOnInit(): void {
    this.sub = this.serviceCursos.getAll().subscribe({
      next: Inscripciones => {
        this.inscripciones = Inscripciones;
      },
        
      error: err => this.errorMessage = err,
    })

  }

  //Desuscribo
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


}