import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { UsuarioService } from '../servicios/usuario.service';
import { DirectorioService } from '../servicios/directorio/directorio.service';

@Component({
  selector: 'app-directorio',
  templateUrl: './directorio.component.html',
  styleUrls: ['./directorio.component.css']
})
export class DirectorioComponent implements OnInit {

  pill1;
  pill2;
  constructor(
    private appComponent : AppComponent,
    private directorioService : DirectorioService
  ) { }

  ngOnInit() {
    this.pill1="active"
    this.pill2=""
    let datos;
    datos={ id: 1 , nombre: 'Universidad Javeriana', link: "http://www.javeriana.edu.co" , imagen: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Escudo150.gif" }; this.valorEtiquetas.push(datos);
    datos={ id: 2 , nombre: 'Universidad Andes', link: "http://uniandes.edu.co" , imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/University_of_Los_Andes_logo.svg/1000px-University_of_Los_Andes_logo.svg.png" }; this.valorEtiquetas.push(datos);
    datos={ id: 3 , nombre: 'Universidad Rosario', link: "http://www.google.com" , imagen: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Escudo150.gif" }; this.valorEtiquetas.push(datos);
    datos={ id: 4 , nombre: 'Universidad Nacional', link: "http://www.google.com" , imagen: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Escudo150.gif" }; this.valorEtiquetas.push(datos);
    
    
    this.directorioService.obtenerDirectorio().subscribe(
      response => {
        this.directorioUniversidades = response;
        console.log(this.directorioUniversidades);
      },
      error => {
        console.log("no se puede obtener tipos identificacion tercero")
      }
    );
  }

  valorEtiquetas = new  Array ();
  directorioUniversidades = new  Array ();
  
  abrirLink(u : any){
    window.open(u.url,'_blank'); 
  }

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
