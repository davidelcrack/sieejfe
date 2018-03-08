import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adicionar-dominio-pop-up',
  templateUrl: './adicionar-dominio-pop-up.component.html',
  styleUrls: ['./adicionar-dominio-pop-up.component.css']
})
export class AdicionarDominioPopUpComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  mostrarAdicionDominio=false;

  cerrarPopUp(){
    console.log('cerrarPopUp : entro a cerrarPopUp');
    this.mostrarAdicionDominio=false;

    let el : any;
    el = document.getElementById("overlayAdicion");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }

  tipo:any;
  abrirAdicionarDominio(tipo : any){
    console.log('abrirAdicionarDominio : entro a abrirAdicionarDominio');
    this.tipo=tipo;

    let el: any;
    el = document.getElementById("overlayAdicion");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }

}
