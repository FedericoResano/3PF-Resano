import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cursos } from 'src/app/shared/class/cursos';
import { CursosService } from 'src/app/shared/services/cursos.service';

@Component({
  selector: 'app-modificar-cursos',
  templateUrl: './modificar-cursos.component.html',
  styleUrls: ['./modificar-cursos.component.scss']
})
export class ModificarCursosComponent implements OnInit, OnDestroy {
  title: string = "Editar curso";
  curso: Cursos;
  sub: Subscription;
  errorMessage = '';

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    private cursosServicio: CursosService,
    private formBuilder: FormBuilder) { };

  //Recupero la info del usuario 
  usuario=localStorage.getItem('usuario');

  //Armo las propiedades del formulario.
  modificarFormGroup: FormGroup = this.formBuilder.group({
    curso: ['', [Validators.required, Validators.maxLength(50)]],
    duracion: ['', [Validators.required, Validators.maxLength(50)]],
    precio: ['', [Validators.required]],
  })

  ngOnInit(): void {
    //Guardo la suscripcion y recupero los datos para llenar el formulario
    this.sub = this.activatedRoute.params.subscribe((params) => {
      var id = params["id"];
      this.cursosServicio.get(id).subscribe({
        next: Cursos => {
          this.curso = Cursos;
          this.modificarFormGroup.patchValue(Cursos);
        },
        error: err => this.errorMessage = err,
      })

    })
  }
  //Cargo los datos que tengo en el formulario en la propiedad de curso y se la paso en un update al servicio. Redirijo a la pagina del listado
  submit() {
    this.curso.curso = this.modificarFormGroup.get("curso")?.value;
    this.curso.duracion = this.modificarFormGroup.get("duracion")?.value;
    this.curso.precio = this.modificarFormGroup.get("precio")?.value;

    this.cursosServicio.update(this.curso).subscribe((resp) => {
      this.router.navigate(["cursos"]);
    })
  }
  //Desuscribo
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

