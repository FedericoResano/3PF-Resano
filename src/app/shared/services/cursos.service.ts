import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cursos } from '../class/cursos';
import { map, Observable, throwError, tap, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  private cursosUrl=  "https://62a61d0e430ba53411d14cbe.mockapi.io/api/Cursos";

  constructor(private http: HttpClient) { }

  //Metodo get para que traiga todos los alumnos y cargar la lista
  getAll():Observable<Cursos[]>{
    return this.http.get<Cursos[]>(this.cursosUrl).pipe(
      tap(data=> console.log('Ejecución sin errores ')),
      catchError(this.handleError)
    );
  }

  //Metodo get para recuperar la informacion de un alumno y cargar los formularios de Modificar y Eliminar
  get(id:number):Observable<Cursos>{
    return this.http.get<Cursos>(this.cursosUrl +'/' + id).pipe(
      tap(data=> console.log('Ejecución sin errores ')),
      catchError(this.handleError)
    );
  }

  //Metodo update para modificar alumno
  update(cursos:Cursos){
    return this.http.put(this.cursosUrl + '/' +cursos.id, cursos).pipe(
      tap(data=> console.log('Ejecución sin errores ')),
      catchError(this.handleError)
    );
  }

  //metodo delete para eliminar alumno
  delete(id:number){
    return this.http.delete(this.cursosUrl + '/' + id).pipe(
      tap(data=> console.log('Ejecución sin errores ')),
      catchError(this.handleError)
    );
  }

  //post para dar de alta un alumno
  add(cursos:Cursos){
    return this.http.post(this.cursosUrl, cursos);
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocurrió un error';
    
    return throwError(errorMessage);
  }
}

