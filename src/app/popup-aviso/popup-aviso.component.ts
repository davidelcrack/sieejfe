import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-popup-aviso',
  templateUrl: './popup-aviso.component.html',
  styleUrls: ['./popup-aviso.component.css']
})
export class PopupAvisoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input('mensaje')mensaje;

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
