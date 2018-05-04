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
    return this.http.post(this.backendUrl + "enviarIdea/", idea, { withCredentials: true })
    .map((res: Response) => res.json());
  }

}
