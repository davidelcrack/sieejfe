import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-popup-aviso',
  templateUrl: './popup-aviso.component.html',
  styleUrls: ['./popup-aviso.component.css']
})
export class PopupAvisoComponent implements OnInit , OnChanges {

  constructor() { }

  ngOnInit() {
  }

  @Input('mensaje')mensaje;

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  mostrar=false;

  mostrarPop(){
    console.log('mostrarPop : entro a mostrarPop');    
    let el : any;
    el = document.getElementById("overlayAviso");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }

  cerrarPopUp(){
    console.log('cerrarPopUp : entro a cerrarPopUp');    
    let el : any;
    el = document.getElementById("overlayAviso");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }

}
