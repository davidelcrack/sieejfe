import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class DirectorioService {

  constructor(
    private http: Http
  ) { }

  backendUrl = environment.url;

  obtenerDirectorio(){      
    return this.http.get(this.backendUrl + "listarUniversidades", { withCredentials: true })
    .map((res: Response) => res.json());
  }

  listarDominiosNacionales(tipo : any){
    return this.http.post(this.backendUrl + "listarDominiosNacionales", tipo, { withCredentials: true })
    .map((res: Response) => res.json());
  }

  listarDominiosInternacionales(tipo : any){
    return this.http.post(this.backendUrl + "listarDominiosInternacionales", tipo, { withCredentials: true })
    .map((res: Response) => res.json());
  }

}
