import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { element } from 'protractor';
import { EventosService } from '../../servicios/eventos/eventos.service';

@Component({
  selector: 'app-formulario-personalizado',
  templateUrl: './formulario-personalizado.component.html',
  styleUrls: ['./formulario-personalizado.component.css']
})
export class FormularioPersonalizadoComponent implements OnInit {

  constructor(
    private eventosService : EventosService
  ) { }

  ngOnInit() {
  }

  atributosPersonalizados = new Array();

  abrir(atributos){
    this.atributosPersonalizados=atributos;
    let el : any;
    el = document.getElementById("overlayFormularioPersonalizado");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }

  @Output() guardo : EventEmitter<any> = new EventEmitter <any>();  
  
  cerrarPopUp(){
    console.log('cerrarPopUp : entro a cerrarPopUp');
    this.atributosPersonalizados=[];
    let el : any;
    el = document.getElementById("overlayFormularioPersonalizado");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }

  enviar(){

    let pojoAtributos= {id: null , dato: null}
    let atributosEnviar = new Array();
    this.atributosPersonalizados.forEach(element =>{
      pojoAtributos={
        id:element.id,
        dato: element.respuesta        
      }
      atributosEnviar.push(pojoAtributos);
    })
    console.log(atributosEnviar);
    this.eventosService.guardarDatosPersonalizados(atributosEnviar).subscribe(
      response => {         
        console.log(response);
        this.guardo.emit('enviar');
        this.cerrarPopUp();
      });    
  }

  comprobar(){
    this.atributosPersonalizados.forEach(element => {
      if(element.descripcion==null){
        return false;
      }
    })
    return true;
  }

}
