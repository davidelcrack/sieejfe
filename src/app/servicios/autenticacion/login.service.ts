import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {

  backendUrl = environment.url;

  constructor(
    private http: Http
  ) { }

  login(username: string, password: string){
    console.log("login_service: Entro a login_service");
    let url = this.backendUrl + "login";    
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');    
    let body = 'username=' + username + '&password=' + password;    

    return this.http.post(url, body, {withCredentials: true, headers: headers})
      .map((res: Response) => res.status);
      
  }

  credencialesUsuario(username: string, password: string): Observable<any> {
    console.log("credencialesUsuario: Entro a credencialesUsuario");
    let url = this.backendUrl + "retornarUsuario";
    var headers = new Headers();      
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
         
    return this.http.get(url, {withCredentials: true, headers: headers })
      .map((res: Response) => res.json());
  }

}
