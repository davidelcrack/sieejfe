
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import { environment } from '../../../environments/environment';
import { ColaRestService } from './cola-rest.service';



@Injectable()
export class ColaService {

  backendUrl = environment.url + 'mensaje';
  timer: Observable<any>;
  suscription: Observable<any>;
  private cola: Array<any> = [];

  constructor(private http: Http, private servicioRest: ColaRestService) { }

  agregarACola(e: any): Observable<any> {
    if(e.valor != null){
    console.log("agregarACola: Entro a agregarACola");
    if (e.prioridad == true) {
      let repetido =this.cola.indexOf(this.cola.find(function(element){
        return element.id===e.id && element.atributo===e.atributo;
      }));
      //console.log(x);
      if(repetido!=-1){
        this.cola.splice(repetido, 1, e);
      }else{
        this.cola.push(e);
      }
      return this.enviar();
    } else {
      let repetido =this.cola.indexOf(this.cola.find(function(element){
        return element.id===e.id && element.atributo===e.atributo;
      }));
      //console.log(x);
      if(repetido!=-1){
        this.cola.splice(repetido, 1, e);
      }else{
        this.cola.push(e);
      }
      this.timer = Observable.timer(5000);
      
      if (this.cola.length == 1) {
        
        console.log("Cola Vacia - Iniciar Timer");
        this.suscription = this.timer.flatMap(t => {

            return this.enviar();
          })
          return this.suscription;
        }

        //this.validarRepetidos(e);

        if (this.cola.length > 4) {

          console.log("Tope de Cola");
          return this.enviar();
        }
      }
    }

  }

  enviar() {
    console.log("enviar: Entro a enviar-cola.service-");
    //this.suscription.unsubscribe();
    console.log(this.cola);
    let copiaCola = this.cola;
    this.cola = [];

    return this.servicioRest.enviar(JSON.stringify(copiaCola));

  }

  //Tiene prioridad alta, se debe enviar de una
  enviarPrioritario(e: any) {
    console.log("enviarPrioritario: Entro a enviarPrioritario");
  }

  validarRepetidos(e: any) {
    console.log("validarRepetidos: Entro a validarRepetidos");
    let repetido = this.cola.indexOf(this.cola.find(function (element) {
      return element.id === e.id && element.atributo === e.atributo;
    }));
    //console.log(x);
    if (repetido != -1) {
      this.cola.splice(repetido, 1, e);
    } else {
      this.cola.push(e);
    }
  }

}
