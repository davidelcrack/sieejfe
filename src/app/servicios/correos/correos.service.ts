import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class CorreosService {

  constructor(
    private http: Http
  ) { }

  backendUrl = environment.url;

  get(){
    return this.http.get(this.backendUrl + "listarCorreosInstitucionales/", { withCredentials: true })
    .map((res: Response) => res.json());
  }

  crearCorreo(correo){
    return this.http.post(this.backendUrl + "crearCorreoInstitucional", correo, { withCredentials: true })
    .map((res: Response) => res.json());
  }

}
