import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, throwError, tap, catchError } from 'rxjs';
import { Alumnos } from '../class/alumnos';

@Injectable({
  providedIn: 'root'
})


export class AlumnosService {

  // archivo alumnos.json ubicado en la carpeta de scr/api Iniciado con el comando json-server --watch alumnos.json desde CMD
  private alumnosUrl=  "https://62a61d0e430ba53411d14cbe.mockapi.io/api/Alumnos";

  constructor(private http: HttpClient) { }

  //Metodo get para que traiga todos los alumnos y cargar la lista
  getAll():Observable<Alumnos[]>{
    return this.http.get<Alumnos[]>(this.alumnosUrl).pipe(
      tap(data=> console.log('Ejecución sin errores ')),
      catchError(this.handleError)
    );
  }

  //Metodo get para recuperar la informacion de un alumno y cargar los formularios de Modificar y Eliminar
  get(id:number):Observable<Alumnos>{
    return this.http.get<Alumnos>(this.alumnosUrl +'/' + id).pipe(
      tap(data=> console.log('Ejecución sin errores ')),
      catchError(this.handleError)
    );
  }

  //Metodo update para modificar alumno
  update(alumnos:Alumnos){
    return this.http.put(this.alumnosUrl + '/' +alumnos.id, alumnos).pipe(
      tap(data=> console.log('Ejecución sin errores ')),
      catchError(this.handleError)
    )
  }

  //metodo delete para eliminar alumno
  delete(id:number){
    return this.http.delete(this.alumnosUrl + '/' + id).pipe(
      tap(data=> console.log('Ejecución sin errores ')),
      catchError(this.handleError)
    );
  }

  //post para dar de alta un alumno
  add(alumnos:Alumnos){
    return this.http.post(this.alumnosUrl, alumnos)
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocurrió un error';
    
    return throwError(errorMessage);
  }
}
