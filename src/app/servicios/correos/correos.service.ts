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
    return this.http.get(this.backendUrl + "obtenerCorreos/", { withCredentials: true })
    .map((res: Response) => res.json());
  }

}
