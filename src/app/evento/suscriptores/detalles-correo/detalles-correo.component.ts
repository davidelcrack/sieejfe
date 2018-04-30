import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-detalles-correo',
  templateUrl: './detalles-correo.component.html',
  styleUrls: ['./detalles-correo.component.css']
})
export class DetallesCorreoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  asunto: any;
  descripcion: any;

  cerrarPopUp(){
    console.log('cerrarPopUp : entro a cerrarPopUp');
    
    let el : any;
    el = document.getElementById("overlayDetallesDeCorreo");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }

  abrirPopUp(){
    console.log('abrirPopUp : entro a abrirPopUp');
    
    let el : any;
    el = document.getElementById("overlayDetallesDeCorreo");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }

  @Output() notify : EventEmitter<any> = new EventEmitter <any>();  

  enviarCorreo(){
    console.log('enviarCorreo : entro a enviarCorreo')
    let detalles={
      asunto: this.asunto,
      descripcion : this.descripcion
    }
    this.cerrarPopUp();
    this.notify.emit(detalles);
  }

}
