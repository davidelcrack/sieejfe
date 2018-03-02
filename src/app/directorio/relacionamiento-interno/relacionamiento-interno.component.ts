import { Component, OnInit } from '@angular/core';
import { DirectorioService } from '../../servicios/directorio/directorio.service';

@Component({
  selector: 'app-relacionamiento-interno',
  templateUrl: './relacionamiento-interno.component.html',
  styleUrls: ['./relacionamiento-interno.component.css']
})
export class RelacionamientoInternoComponent implements OnInit {

  constructor(
    private directorioService : DirectorioService
  ) { }


  ngOnInit() {

    /*this.directorioService.obtenerDirectorio().subscribe(
      response => {
        this.directorioUniversidades = response;
        console.log(this.directorioUniversidades);
      },
      error => {
        console.log("no se puede obtener tipos identificacion tercero")
      }
    );*/
  }

  dominiosNacionales = new  Array ();
  
  abrirLink(u : any){
    window.open(u,'_blank'); 
  }

  getDominios(tipo : any){
    console.log('getDominios : entro a getDominios', tipo)
    this.dominiosNacionales=[];
    
    this.directorioService.listarDominiosNacionales(tipo).subscribe(
      response => {
        this.dominiosNacionales = response;
        console.log(this.dominiosNacionales);
      },
      error => {
        console.log("Error en dominios")
      }
    );
  }

  seleccion(seleccion){
    console.log('seleccion : entro a seleccion', seleccion)
  }

}
