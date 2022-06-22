import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cursos } from 'src/app/shared/class/cursos';
import { CursosService } from 'src/app/shared/services/cursos.service';

@Component({
  selector: 'app-eliminar-cursos',
  templateUrl: './eliminar-cursos.component.html',
  styleUrls: ['./eliminar-cursos.component.scss']
})
export class EliminarCursosComponent implements OnInit, OnDestroy {

  title: string = "Eliminar curso";

  //Genero la propiedad alumno para el get y alumnos para volver a cargar la lista
  curso: Cursos
  cursos: Cursos[];
  id: number;
  sub: Subscription;
  errorMessage = '';

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    private cursosServicio: CursosService,
    private formBuilder: FormBuilder) { };

  //Recupero la info del usuario 
  usuario=localStorage.getItem('usuario');


  eliminarFormGroup: FormGroup = this.formBuilder.group({
    curso: ['', [Validators.required, Validators.maxLength(50)]],
    duracion: ['', [Validators.required, Validators.maxLength(50)]],
    precio: ['', [Validators.required]],
  })

  ngOnInit(): void {
    //Llamo al get del servicio para que me cargue los datos en el formulario y aca cargo el id en una variable para luego pasarla en le post.
    //Guardo la suscripcion
    this.sub = this.activatedRoute.params.subscribe((params) => {
      this.id = params["id"];
      this.cursosServicio.get(this.id).subscribe({
        next: Cursos => {
          this.curso = Cursos;
          this.eliminarFormGroup.patchValue(Cursos);
          this.eliminarFormGroup.disable();
        },
        error: err => this.errorMessage = err,
      })
    })
  }
  //Envio el id del curso a eliminar y regenero la propiedad cursos[] para tenerla actuaizada. Redirijo a la lista de cursos
  submit() {
    this.cursosServicio.delete(this.id).subscribe((resp) => {
      this.cursosServicio.getAll().subscribe((data) => {
        this.cursos = data;
      })
      this.router.navigate(["cursos"])
    })
  };

  //Desuscribo
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


}