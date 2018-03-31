import { Component, OnInit, ViewChild } from '@angular/core';
import { DirectorioService } from '../../servicios/directorio/directorio.service';
import { DominioPopUpComponent } from '../dominio-pop-up/dominio-pop-up.component';
import { AdicionarDominioPopUpComponent } from '../adicionar-dominio-pop-up/adicionar-dominio-pop-up.component';
import { ImagenPopUpComponent } from '../imagen-pop-up/imagen-pop-up.component';

@Component({
  selector: 'app-relacionamiento-interno',
  templateUrl: './relacionamiento-interno.component.html',
  styleUrls: ['./relacionamiento-interno.component.css']
})
export class RelacionamientoInternoComponent implements OnInit {

  @ViewChild(DominioPopUpComponent) 
  dominioPopUp: DominioPopUpComponent;

  @ViewChild(AdicionarDominioPopUpComponent) 
  adicionarPopUp: AdicionarDominioPopUpComponent;

  @ViewChild(ImagenPopUpComponent) 
  imagenDominio: ImagenPopUpComponent;

  datos : any;
  esAdmin : boolean = false;

  constructor(
    private directorioService : DirectorioService
  ) { }


  ngOnInit() {
    this.esAdmin = JSON.parse(localStorage.getItem('ADMIN'));
    /*this.directorioService.obtenerDirectorio().subscribe(
      response => {
        this.directorioUniversidades = response;
        console.log(this.directorioUniversidades);
      },
      error => {
        console.log("no se puede obtener tipos identificacion tercero")
      }
    );*/
    let datos;
    datos={ id: 1 , nombre: 'Universidad Javeriana Bogota', url: "http://www.javeriana.edu.co" , imagen: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Escudo150.gif" };

    this.datos=datos;
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

  editarDominioNacional(dominio : any){
    console.log('editarDominioNacional : entro a editarDominioNacional');
    
    this.dominioPopUp.mostrarEdicionDominio=true;
    this.dominioPopUp.abrirEditarDominio(dominio);
  }

  editarImagenDominioNacional(idAsociado : any){
    console.log('editarImagenDominioNacional : entro a editarImagenDominioNacional');
    //Para que cargue imagen defecto
    this.imagenDominio.cargo=false;
    this.imagenDominio.mostrarImagenDominio=true;
    this.imagenDominio.abrirImagenDominio(idAsociado);
  }

  abrirEdicion(){
    console.log('abrirEdicion : entro a abrirEdicion');
        
    this.adicionarPopUp.mostrarAdicionDominio=true;
    this.adicionarPopUp.abrirAdicionarDominio('NACIONAL');
  }

}
