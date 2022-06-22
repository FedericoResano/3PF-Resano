import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Alumnos } from 'src/app/shared/class/alumnos';
import { Inscripciones } from 'src/app/shared/class/inscripciones';
import { AlumnosService } from 'src/app/shared/services/alumnos.service';
import { InscripcionesService } from 'src/app/shared/services/inscripciones.service';

@Component({
  selector: 'app-detalles-alumnos',
  templateUrl: './detalles-alumnos.component.html',
  styleUrls: ['./detalles-alumnos.component.scss']
})
export class DetallesAlumnosComponent implements OnInit, OnDestroy {

 
  title = 'Detalle de Alumno'
  alumno: Alumnos;
  id: number;
  errorMessage: '';
  sub: Subscription;
  inscripciones: Inscripciones[];
  displayedColumns: string[] = ['inscripciones', 'accion'];

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    private alumnosServicio: AlumnosService,
    private inscripcionesServicio: InscripcionesService,
    private formBuilder: FormBuilder) { };

  //Recupero la info del usuario 
  usuario=localStorage.getItem('usuario');

  detalleFormGroup: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.maxLength(100)]],
    apellido: ['', [Validators.required, Validators.maxLength(100)]],
    mail: ['', [Validators.required, Validators.email]],
    edad: ['', [Validators.required, Validators.max(99)]],
    fechaNacimiento: [new Date(), Validators.required],
    usuario: ['', [Validators.required, Validators.maxLength(50)]],

  })

  ngOnInit(): void {

    //guardo la suscripcion y cargo el form con los datos

    this.sub = this.activatedRoute.params.subscribe((params) => {
      this.id = params["id"];
      this.alumnosServicio.get(this.id).subscribe({
        next: Alumnos => {
          this.alumno = Alumnos;
          this.detalleFormGroup.patchValue(Alumnos);
          this.detalleFormGroup.disable();
          //Cargo la variable de inscripciones para generar la tabla donde se muestran los cursos a los que está inscripto
          this.inscripciones = this.performFilter(this.id);
        },
        error: err => this.errorMessage = err,
      })

    })
  }

  submit() {
    this.router.navigate(["alumnos"]);
  }

  //Desuscribo
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  //Me traigo los cursos a los que esta inscripto el alumno y luego lo cargo en el OnInit
  performFilter(IdAlumno: number): Inscripciones[] {
    this.inscripcionesServicio.getAll().subscribe({
      next: Inscripciones => {
        this.inscripciones = Inscripciones.filter((inscripcion: Inscripciones) =>
          inscripcion.idAlumno == IdAlumno);
      },
      error: err => this.errorMessage = err,
    });
    return this.inscripciones

  }

  //Posta para eliminar la inscripción del alumno a un curso
  desinscribirAlumno(id: number) {
    this.inscripcionesServicio.delete(id).subscribe((resp) => {
      this.inscripcionesServicio.getAll().subscribe((data) => {
        this.inscripciones = data;
      })
    })
    this.router.navigate(["/alumnos"])

  }
}

