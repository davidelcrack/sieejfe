import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from '../app.component';
import { UsuarioService } from '../servicios/usuario.service';
import { DirectorioService } from '../servicios/directorio/directorio.service';
import { RelacionamientoInternoComponent } from './relacionamiento-interno/relacionamiento-interno.component';
import { RelacionamientoExternoComponent } from './relacionamiento-externo/relacionamiento-externo.component';

@Component({
  selector: 'app-directorio',
  templateUrl: './directorio.component.html',
  styleUrls: ['./directorio.component.css']
})
export class DirectorioComponent implements OnInit {

  @ViewChild(RelacionamientoInternoComponent) interno: RelacionamientoInternoComponent;

  @ViewChild(RelacionamientoExternoComponent) externo: RelacionamientoExternoComponent

  pill1;
  pill2;
  constructor(
    private appComponent : AppComponent
  ) { }

  ngOnInit() {
    this.pill1="active"
    this.pill2=""
    let datos;
    datos={ id: 1 , nombre: 'Universidad Javeriana', link: "http://www.javeriana.edu.co" , imagen: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Escudo150.gif" }; this.valorEtiquetas.push(datos);
    datos={ id: 2 , nombre: 'Universidad Andes', link: "http://uniandes.edu.co" , imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/University_of_Los_Andes_logo.svg/1000px-University_of_Los_Andes_logo.svg.png" }; this.valorEtiquetas.push(datos);
    datos={ id: 3 , nombre: 'Universidad Rosario', link: "http://www.google.com" , imagen: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Escudo150.gif" }; this.valorEtiquetas.push(datos);
    datos={ id: 4 , nombre: 'Universidad Nacional', link: "http://www.google.com" , imagen: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Escudo150.gif" }; this.valorEtiquetas.push(datos);    
    
    
  }

  valorEtiquetas = new  Array ();
  
  cambiarActive(a : any){
    console.log(a);
    if(a==="pill1"){
      this.pill1="active";
      this.pill2="";
    }else{
      this.pill2="active";
      this.pill1=""
    }
  }

  abrirEdicion(){
    this.appComponent.openTabs('universidad');
  }

}
