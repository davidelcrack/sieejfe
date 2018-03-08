import { Component, OnInit, ViewChild } from '@angular/core';
import { DirectorioService } from '../../servicios/directorio/directorio.service';
import { DominioPopUpComponent } from '../dominio-pop-up/dominio-pop-up.component';

@Component({
  selector: 'app-relacionamiento-externo',
  templateUrl: './relacionamiento-externo.component.html',
  styleUrls: ['./relacionamiento-externo.component.css']
})
export class RelacionamientoExternoComponent implements OnInit {

  @ViewChild(DominioPopUpComponent) 
  dominioPopUp: DominioPopUpComponent;

  constructor(
    private directorioService : DirectorioService
  ) { }

  ngOnInit() {
  }

  dominiosInternacionales = new  Array ();
  
  abrirLink(u : any){
    window.open(u,'_blank'); 
  }

  getDominiosInternacionales(tipo : any){
    console.log('getDominiosInternacionales : entro a getDominiosInternacionales', tipo)
    this.dominiosInternacionales=[];
    
    this.directorioService.listarDominiosInternacionales(tipo).subscribe(
      response => {
        this.dominiosInternacionales = response;
        console.log(this.dominiosInternacionales);
      },
      error => {
        console.log("Error en dominios internacionales")
      }
    );
  }

  seleccion(seleccion){
    console.log('seleccion : entro a seleccion', seleccion)
  }

  editarDominioInternacional(dominio : any){
    console.log('editarDominioInternacional : entro a editarDominioInternacional');
    
    let datos;
    datos={ id: 1 , nombre: 'Universidad Distrital', link: "http://www.javeriana.edu.co" , imagen: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Escudo150.gif" };
    
    this.dominioPopUp.mostrarEdicionDominio=true;
    this.dominioPopUp.abrirEditarDominio(datos);
  }

}
