import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Inscripciones } from '../class/inscripciones';
import { map, Observable, throwError, tap, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {
  private inscripcionesUrl=  "https://62a61d0e430ba53411d14cbe.mockapi.io/api/Inscripciones";

  constructor(private http: HttpClient) { }

  //Metodo get para que traiga todos los alumnos y cargar la lista
  getAll():Observable<Inscripciones[]>{
    return this.http.get<Inscripciones[]>(this.inscripcionesUrl).pipe(
      tap(data=> console.log('Ejecución sin errores ')),
      catchError(this.handleError)
    );
  }

  //Metodo get para recuperar la informacion de un alumno y cargar los formularios de Modificar y Eliminar
  get(id:number):Observable<Inscripciones>{
    return this.http.get<Inscripciones>(this.inscripcionesUrl +'/' + id).pipe(
      tap(data=> console.log('Ejecución sin errores ')),
      catchError(this.handleError)
    );
  }

  //metodo delete para eliminar alumno
  delete(id:number){
    return this.http.delete(this.inscripcionesUrl + '/' + id).pipe(
      tap(data=> console.log('Ejecución sin errores ')),
      catchError(this.handleError)
    );
  }

  //post para dar de alta un alumno
  add(inscripciones:Inscripciones){
    return this.http.post(this.inscripcionesUrl, inscripciones);
  }
  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocurrió un error';
    
    return throwError(errorMessage);
  }
}
