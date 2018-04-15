import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class EmprendimientoServicesService {

  constructor(
    private http: Http
  ) { }

  backendUrl = environment.url;

  obtenerLosServicios(){      
    return this.http.get(this.backendUrl + "listarServicios/", { withCredentials: true })
    .map((res: Response) => res.json());
  }

  solicitarService(solicitud){
    console.log(solicitud)
    return this.http.post(this.backendUrl + "crearSolicitud/", solicitud, { withCredentials: true })
    .map((res: Response) => res.json());
  }

  obtenerSolicitudes(codigo : any){      
    return this.http.get(this.backendUrl + "listarSolicitudes/"+ codigo, { withCredentials: true })
    .map((res: Response) => res.json());
  }

}
