import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class LogoutService {

  constructor(
    private http: Http
  ) { }

  backendUrl = environment.url;

  cerrarSesion(): Observable<any>{
    console.log("cerrarSesion_servicio: Entro a cerrarSesion_servicio");
    
    let url = this.backendUrl + "logout";
    var headers = new Headers();      
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    
    
    return this.http.get(url, {withCredentials: true, headers: headers })
      .map((res: Response) => res.json());
  }

}
