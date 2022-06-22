import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthChildGuard implements CanActivate {
  usuario=localStorage.getItem('usuario');
  constructor(private route: Router){};
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      debugger;
      if(this.usuario != 'ADMIN'){
        alert('No tienes permisos para ingresar a la ruta indicada');
        return this.route.navigate(['inicio']).then(()=> false);
      }
    return true;
  }
  
}
