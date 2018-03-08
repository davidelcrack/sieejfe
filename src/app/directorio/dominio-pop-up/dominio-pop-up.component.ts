import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dominio-pop-up',
  templateUrl: './dominio-pop-up.component.html',
  styleUrls: ['./dominio-pop-up.component.css']
})
export class DominioPopUpComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  cerrarPopUp(){
    console.log('cerrarPopUp : entro a cerrarPopUp');
    let el : any;
    el = document.getElementById("overlayDominio");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }

  abrirEditarDominio(row : any){
    let el: any;
    el = document.getElementById("overlayDominio");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }

}
