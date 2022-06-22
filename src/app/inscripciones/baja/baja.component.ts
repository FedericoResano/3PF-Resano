import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Alumnos } from 'src/app/shared/class/alumnos';
import { Cursos } from 'src/app/shared/class/cursos';
import { Inscripciones } from 'src/app/shared/class/inscripciones';
import { AlumnosService } from 'src/app/shared/services/alumnos.service';
import { CursosService } from 'src/app/shared/services/cursos.service';
import { InscripcionesService } from 'src/app/shared/services/inscripciones.service';


@Component({
  selector: 'app-baja',
  templateUrl: './baja.component.html',
  styleUrls: ['./baja.component.scss']
})
export class BajaComponent implements OnInit, OnDestroy {



  title: string = "Baja de inscripción";
  inscripciones: Inscripciones[];
  inscripcion: Inscripciones;
  alumnos: Alumnos;
  cursos: Cursos;
  id: number;
  sub: Subscription;
  errorMessage = '';

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    private inscripcionesServicio: InscripcionesService,
    private alumnosServicio: AlumnosService,
    private cursosServicio: CursosService,
    private formBuilder: FormBuilder) { };

  //Recupero la info del usuario 
  usuario=localStorage.getItem('usuario');


  bajaFormGroup: FormGroup = this.formBuilder.group({
    alumno: ['', Validators.required],
    curso: ['', Validators.required],
    fechaInicio: ['', Validators.required],
  })

  //Guardo la suscripcin y lleno el form con los datos y lo deshabilito
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params["id"];
      this.sub = this.inscripcionesServicio.get(this.id).subscribe({
        next: Inscripciones => {
          this.inscripcion = Inscripciones;
          this.bajaFormGroup.patchValue(Inscripciones);
          this.bajaFormGroup.disable();
        },
        error: err => this.errorMessage = err,
      })
    })


  }
  //Envio el id de la inscripcion a eliminar y regenero la propiedad inscripciones[] para tenerla actuaizada. Redirijo a la lista de inscripciones
  submit() {
    this.sub = this.inscripcionesServicio.delete(this.id).subscribe((resp) => {
      this.inscripcionesServicio.getAll().subscribe((data) => {
        this.inscripciones = data;
        this.router.navigate(["inscripciones"])
      })

    })
  };

  //Desuscribo
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
