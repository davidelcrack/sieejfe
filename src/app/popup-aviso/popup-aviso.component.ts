import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-popup-aviso',
  templateUrl: './popup-aviso.component.html',
  styleUrls: ['./popup-aviso.component.css']
})
export class PopupAvisoComponent implements OnInit , OnChanges {

  static mostrar : boolean=false;
  static mostrarExito: boolean=false;
  static mostrarBotones: boolean=false;
  constructor() { }

  ngOnInit() {
  }

  getStaticMostrarPopGeneral() {
    return PopupAvisoComponent.mostrar;
  }

  getStaticMostrarPopGeneralExito() {
    return PopupAvisoComponent.mostrarExito;
  }
  getStaticMostrarPopGeneralBotones() {
    return PopupAvisoComponent.mostrarBotones;
  }
  @Input('mensaje')mensaje;

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  mostrar=false;

  @Output() cerroPop : EventEmitter<any> = new EventEmitter <any>();  
  cerrarPopUp(){    
    console.log('cerrarPopUp : entro a cerrarPopUp');    
    PopupAvisoComponent.mostrar=false;
  }



  cerrarPopUpExito(){
    console.log('cerrarPopUp : entro a cerrarPopUp');   
    this.cerroPop.emit('Cerro'); 
    PopupAvisoComponent.mostrarExito=false;
  }

  cerrarPopUpBotones(){
    console.log('cerrarPopUpBotones : entro a cerrarPopUpBotones');       
    PopupAvisoComponent.mostrarBotones=false;
  }

  @Output() confirmo : EventEmitter<any> = new EventEmitter <any>();  
  confirmacion(){
    console.log('confirmacion : entro a confirmacion');   
    this.confirmo.emit('Se confirmo'); 
    PopupAvisoComponent.mostrarBotones=false;
  }

}
