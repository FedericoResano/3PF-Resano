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
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.scss']
})
export class AltaComponent implements OnInit, OnDestroy {

  title: string = "Inscripción de alumno";
  inscripciones: Inscripciones[];
  inscripcion: Inscripciones;
  alumnos: Alumnos[];
  cursos: Cursos[];
  sub: Subscription
  
  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    private inscripcionesServicio: InscripcionesService,
    private alumnosServicio: AlumnosService,
    private cursosServicio: CursosService,
    private formBuilder: FormBuilder) { };

  //Recupero la info del usuario 
  usuario=localStorage.getItem('usuario');


    altaFormGroup: FormGroup = this.formBuilder.group({
      alumno:[''],
      curso:[''],
      fechaInicio:['', Validators.required],
      idAlumno:['', Validators.required],
      idCurso:['', Validators.required],
    })

  ngOnInit(): void {
    this.alumnosServicio.getAll().subscribe(data => {
      this.alumnos = data;
    })
    this.cursosServicio.getAll().subscribe(data => {
      this.cursos = data;
    })
  }

  //Hago el post para agregar una suscripcion y guardo la suscripcion
  submit(){
    //Cargo los datos del alumno y del curso, para despues poder guardarme el nombre del alumno y del curso.
    var descripcionAlumno = this.alumnos.find(x => x.id ==  this.altaFormGroup.controls["idAlumno"].value)
    var descripcionCurso = this.cursos.find(x => x.id ==  this.altaFormGroup.controls["idCurso"].value)
    this.inscripcion= {
      id: 0,
      idAlumno: this.altaFormGroup.controls["idAlumno"].value,
      curso: descripcionCurso.curso,
      fechaInicio: this.altaFormGroup.controls["fechaInicio"].value,
      idCurso: this.altaFormGroup.controls["idCurso"].value,
      alumno: descripcionAlumno.apellido + ', ' + descripcionAlumno.nombre
    };

    this.sub = this.inscripcionesServicio.add(this.inscripcion).subscribe((resp)=> {
      this.router.navigate(["inscripciones"])
    })
  }

  //Desuscribo
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
