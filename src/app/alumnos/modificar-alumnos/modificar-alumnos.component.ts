import { Component, OnDestroy, OnInit } from '@angular/core';
import { Alumnos } from 'src/app/shared/class/alumnos';
import { AlumnosService } from 'src/app/shared/services/alumnos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-modificar-alumnos',
  templateUrl: './modificar-alumnos.component.html',
  styleUrls: ['./modificar-alumnos.component.scss']
})
export class ModificarAlumnosComponent implements OnInit, OnDestroy {
  
  title: string = "Editar alumno";
  alumno: Alumnos;
  sub: Subscription;
  errorMessage= '';

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    private alumnosServicio: AlumnosService,
    private formBuilder: FormBuilder) { };

  //Recupero la info del usuario 
  usuario=localStorage.getItem('usuario');

  //Armo las propiedades del formulario.
  modificarFormGroup: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.maxLength(100)]],
    apellido: ['', [Validators.required, Validators.maxLength(100)]],
    mail: ['', [Validators.required, Validators.email]],
    edad: ['', [Validators.required, Validators.max(99)]],
    fechaNacimiento: ['', Validators.required],
    usuario: ['', [Validators.required, Validators.maxLength(50)]],
  })

  ngOnInit(): void {
    //cargo el formulario y la suscripcion
    this.sub = this.activatedRoute.params.subscribe((params) => {
      var id = params["id"];
      this.alumnosServicio.get(id).subscribe({
        next: Alumnos => {
          this.alumno = Alumnos;
          this.modificarFormGroup.patchValue(Alumnos);
        },
        error: err => this.errorMessage = err,
        })
    })
  }
  //Cargo los datos que tengo en el formulario en la propiedad de alumno y se la paso en un update al servicio. Redirijo a la pagina del listado
  submit() {
    this.alumno.apellido = this.modificarFormGroup.get("apellido")?.value;
    this.alumno.nombre = this.modificarFormGroup.get("nombre")?.value;
    this.alumno.mail = this.modificarFormGroup.get("mail")?.value;
    this.alumno.edad = this.modificarFormGroup.get("edad")?.value;
    this.alumno.fechaNacimiento = this.modificarFormGroup.get("fechaNacimiento")?.value;

    this.alumnosServicio.update(this.alumno).subscribe((resp) => {
      this.router.navigate(["alumnos"]);
    })
  }

  //Desuscribo
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
