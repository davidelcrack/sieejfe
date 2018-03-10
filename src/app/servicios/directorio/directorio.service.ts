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

  upload(formData,id) {    
    console.log(JSON.stringify(formData));
    
    return this.http.post(this.backendUrl + "inventario/imagen/upload/" +  id, formData , { withCredentials: true })
    .map((res:Response) => {    
      if (res.status ==200) 
        return 'ok';    
        throw Error('Error: ' + res.status);    
    }).catch((err:Response) => {    
      if (err.status ==401)    
      throw new Error(err.status.toString());    
      throw Error(err.toString());    
    });    
  }

}
