import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class ConfiguracionService {

  constructor(
    private http: Http
  ) { }

  backendUrl = environment.url;

  asignarEtiquetas(etiqueta : any){
    return this.http.post(this.backendUrl + "asignarEtiquetas/", etiqueta, { withCredentials: true })
    .map((res: Response) => res.json());
  }

  cargarActuales(){
    return this.http.get(this.backendUrl + "listarEtiquetasPropias/", { withCredentials: true })
    .map((res: Response) => res.json());
  }

}
