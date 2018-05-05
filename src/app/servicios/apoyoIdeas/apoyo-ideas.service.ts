import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class ApoyoIdeasService {

  constructor(
    private http: Http
  ) { }

  backendUrl = environment.url;

  enviar(idea : any){
    return this.http.post(this.backendUrl + "guardarIdea/", idea, { withCredentials: true })
    .map((res: Response) => res.json());
  }

  listar(){
    return this.http.get(this.backendUrl + "listarEtiquetas/", { withCredentials: true })
    .map((res: Response) => res.json());
  }

  listarIdeasSeguimiento(){
    return this.http.get(this.backendUrl + "listarIdeas/", { withCredentials: true })
    .map((res: Response) => res.json());
  }

  responderAIdea(respuesta : any){
    return this.http.post(this.backendUrl + "responderIdea/", respuesta, { withCredentials: true })
    .map((res: Response) => res.json());
  }

}
