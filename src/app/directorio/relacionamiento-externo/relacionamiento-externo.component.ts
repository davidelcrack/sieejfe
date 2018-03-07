import { Component, OnInit } from '@angular/core';
import { DirectorioService } from '../../servicios/directorio/directorio.service';

@Component({
  selector: 'app-relacionamiento-externo',
  templateUrl: './relacionamiento-externo.component.html',
  styleUrls: ['./relacionamiento-externo.component.css']
})
export class RelacionamientoExternoComponent implements OnInit {

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

}
