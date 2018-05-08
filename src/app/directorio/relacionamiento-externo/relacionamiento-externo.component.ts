import { Component, OnInit, ViewChild } from '@angular/core';
import { DirectorioService } from '../../servicios/directorio/directorio.service';
import { DominioPopUpComponent } from '../dominio-pop-up/dominio-pop-up.component';
import { AdicionarDominioPopUpComponent } from '../adicionar-dominio-pop-up/adicionar-dominio-pop-up.component';
import { ImagenPopUpComponent } from '../imagen-pop-up/imagen-pop-up.component';
import { ColaService } from '../../servicios/cola/cola.service';

@Component({
  selector: 'app-relacionamiento-externo',
  templateUrl: './relacionamiento-externo.component.html',
  styleUrls: ['./relacionamiento-externo.component.css']
})
export class RelacionamientoExternoComponent implements OnInit {

  @ViewChild(DominioPopUpComponent) 
  dominioPopUp: DominioPopUpComponent;

  @ViewChild(AdicionarDominioPopUpComponent) 
  adicionarPopUp: AdicionarDominioPopUpComponent;

  @ViewChild(ImagenPopUpComponent) 
  imagenDominio: ImagenPopUpComponent;

  constructor(
    private directorioService : DirectorioService,
    private serviceCola : ColaService
  ) { }

  datos : any;
  esAdmin : boolean = false;
  // valorEtiquetas = new  Array ();
  map = new Map();

  ngOnInit() {

    this.map.set("CIENTIFICA",false);
    this.map.set("LABORATORIO",false);
    this.map.set("UNIVERSIDAD",false);
    this.map.set("RED_ACELERADORAS",false);
    this.map.set("TECNOLOGICOS",false);
    this.map.set("AUSJAL",false);

    this.esAdmin = JSON.parse(localStorage.getItem('ADMIN'));

    let datos;
    datos={ id: 2 , nombre: 'Universidad Distrital', url: "http://www.javeriana.edu.co" , imagen: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Escudo150.gif" };

    this.datos=datos;    
  }

  dominiosInternacionales = new  Array ();
  
  abrirLink(u : any){    
    if(u.startsWith("http")){
      window.open(u,'_blank'); 
    }else{
      window.open('http://'+u,'_blank'); 
    }
  }

  getDominiosInternacionales(tipo : any){
    console.log('getDominiosInternacionales : entro a getDominiosInternacionales', tipo)
    this.dominiosInternacionales=[];

    this.actualizarChecks(tipo);
    
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

  editarDominioInternacional(dominio : any){
    console.log('editarDominioInternacional : entro a editarDominioInternacional');
    
    this.dominioPopUp.mostrarEdicionDominio=true;
    this.dominioPopUp.abrirEditarDominio(dominio);
  }

  editarImagenDominioInternacional(idAsociado : any){
    console.log('editarImagenDominioNacional : entro a editarImagenDominioNacional');
    //Para que cargue imagen defecto
    this.imagenDominio.cargo=false;
    this.imagenDominio.mostrarImagenDominio=true;
    this.imagenDominio.abrirImagenDominio(idAsociado);
  }

  abrirEdicion(){
    console.log('abrirEdicion : entro a abrirEdicion');
        
    this.adicionarPopUp.mostrarAdicionDominio=true;
    this.adicionarPopUp.abrirAdicionarDominio('INTERNACIONAL');
  }

  eliminarDominioInternacional(id, tipo){
    let mensaje = { id: id  , accion: 'eliminar' , clase: 'Dominio', atributo: 'ok' , valor: 'ok' , prioridad: true, tipoDato: 'STRING' }
    
    console.log(mensaje);

    let observable = this.serviceCola.agregarACola(mensaje);

    if (observable) {
      observable.subscribe(response => {
        console.log(response)           
        this.actualizarChecks(tipo); 
        this.getDominiosInternacionales(tipo);
      },
        error => {
          console.log("Error al elminar correo");
        });
    }
  }

}
