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

  map = new Map();

  constructor(
    private directorioService : DirectorioService
  ) { }


  ngOnInit() {

    this.map.set("UNIVERSIDAD",false);
    this.map.set("GOBIERNO",false);
    this.map.set("REGULADORES",false);
    this.map.set("INVESTIGACION",false);
    this.map.set("ONG",false);
    this.map.set("INDUSTRIA",false);
    this.map.set("SPONSOR",false);
    this.map.set("RED_MENTORES",false);
    this.map.set("RED_FINANCIADORES",false);
    this.map.set("INCUBADORES",false);
    this.map.set("RED_ACELERADORAS",false);

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

    this.actualizarChecks(tipo);
    
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

  actualizarChecks(tipo : any){
    console.log(tipo);
    Array.from(this.map.entries(), (value: any) => {
      if(value[0] != tipo){
        if(value[1]==true){
          this.map.set(value[0], false);
        }
      }else{
        if(value[1]==true){
          this.map.set(value[0], false);
        }else{
          this.map.set(value[0], true);
        }
      }
    });
    console.log(this.map.size,this.map.get(tipo));   
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
