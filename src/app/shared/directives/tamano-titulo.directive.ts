import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appTamanoTitulo]'
})
export class TamanoTituloDirective {

  @Input('appTamanoTitulo') tamanoTitulo:string;

  constructor(private elemento: ElementRef) { }

  ngOnInit(){
    this.actualizar();
  }

  ngOnChange(){
    this.actualizar();
  }
  actualizar(){
    if (this.tamanoTitulo == 'titulo')
    this.elemento.nativeElement.style.fontSize= '20';
  }
}
