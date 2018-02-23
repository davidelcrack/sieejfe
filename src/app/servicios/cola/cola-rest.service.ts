//import { AppComponent } from './../../app.component';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class ColaRestService {

  backendUrl = environment.url + 'mensaje';
 
  constructor(
    private http: Http,
    //private appComponent:  AppComponent
  ) { }

  armarUsuario(mensaje) {
    console.log("armarUsuarioREST: Entro a armarUsuarioREST");
    console.log('{"mensaje":' + JSON.stringify(mensaje) + '}');
    //let headers = new Headers({'Content-Type':'application/json; charset=utf-8'});
    //let headers = new Headers({'Content-Type': 'application/json'}); 
    //let headers: Headers = new Headers(); 
    //headers.append("Authorization", "Basic " + btoa("ajay" + ":" + "test")); , {headers: headers}
    return this.http.post(this.backendUrl, '{"mensaje":' + JSON.stringify(mensaje) + '}');
  }

  enviar(copia) : Observable<any>{
    //this.appComponent.mostrarNotificacion();
    console.log("mensaje", copia)
    return this.http.post(
      environment.url + 'mensaje',
      copia,
      { withCredentials: true })
      .map((res: Response) => res.json());

  }


}
