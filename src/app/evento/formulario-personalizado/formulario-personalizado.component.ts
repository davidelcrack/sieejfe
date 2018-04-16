import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-formulario-personalizado',
  templateUrl: './formulario-personalizado.component.html',
  styleUrls: ['./formulario-personalizado.component.css']
})
export class FormularioPersonalizadoComponent implements OnInit {

  constructor() { }

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
    this.guardo.emit('enviar');
    this.cerrarPopUp();
  }

}
