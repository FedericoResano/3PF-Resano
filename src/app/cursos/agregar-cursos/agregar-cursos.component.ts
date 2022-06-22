import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cursos } from 'src/app/shared/class/cursos';
import { CursosService } from 'src/app/shared/services/cursos.service';


@Component({
  selector: 'app-agregar-cursos',
  templateUrl: './agregar-cursos.component.html',
  styleUrls: ['./agregar-cursos.component.scss']
})
export class AgregarCursosComponent implements OnInit {

 
  title: string = "Agregar alumno";
  
  curso: Cursos;
  sub: Subscription;
  
  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    private cursosServicio: CursosService,
    private formBuilder: FormBuilder) {};

    usuario=localStorage.getItem('usuario');
    
    //Armo el form
    agregarFormGroup: FormGroup = this.formBuilder.group({
      curso:['', [Validators.required, Validators.maxLength(50)]],
      duracion:['', [Validators.required, Validators.maxLength(50)]],
      precio:['', [Validators.required]],
    })

  ngOnInit(): void {
  }

  //Cargo los datos del form y genero el post 
  submit(){
    this.curso= {
      id: 0,
      curso: this.agregarFormGroup.controls["curso"].value,
      duracion: this.agregarFormGroup.controls["duracion"].value,
      precio: this.agregarFormGroup.controls["precio"].value
    };

    //Guardo la suscripcion
    this.sub = this.cursosServicio.add(this.curso).subscribe((resp)=> {
      this.router.navigate(["/cursos"])
    })

  };

  //Desuscribo
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

