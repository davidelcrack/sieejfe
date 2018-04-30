import { Component, OnInit } from '@angular/core';
import { DirectorioService } from '../../servicios/directorio/directorio.service';

@Component({
  selector: 'app-adicionar-dominio-pop-up',
  templateUrl: './adicionar-dominio-pop-up.component.html',
  styleUrls: ['./adicionar-dominio-pop-up.component.css']
})
export class AdicionarDominioPopUpComponent implements OnInit {

  constructor(
    private directorioService : DirectorioService
  ) { }

  ngOnInit() {
  }

  mostrarAdicionDominio=false;
  clasificacion : any
  
  dominio ={nombre : null, url : null}
  clasificacionDominios = new Array();
  nacional: boolean;

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

    if(this.tipo=='NACIONAL'){
      this.nacional=true;
      let data;
      data= {nombre:'UNIVERSIDAD', identificador:'UNIVERSIDAD'}
      this.clasificacionDominios.push(data);
      data= {nombre:'GOBIERNO', identificador:'GOBIERNO'}
      this.clasificacionDominios.push(data);
      data= {nombre:'REGULADORES', identificador:'REGULADORES'}
      this.clasificacionDominios.push(data);
      data= {nombre:'INVESTIGACION', identificador:'INVESTIGACION'}
      this.clasificacionDominios.push(data);
      data= {nombre:'ONG', identificador:'ONG'}
      this.clasificacionDominios.push(data);
      data= {nombre:'INDUSTRIA', identificador:'INDUSTRIA'}
      this.clasificacionDominios.push(data);
      data= {nombre:'SPONSOR', identificador:'SPONSOR'}
      this.clasificacionDominios.push(data);
      data= {nombre:'RED DE MENTORES', identificador:'RED_MENTORES'}
      this.clasificacionDominios.push(data);
      data= {nombre:'RED DE FINANCIADORES', identificador:'RED_FINANCIADORES'}
      this.clasificacionDominios.push(data);
      data= {nombre:'ENCUBADORES', identificador:'INCUBADORES'}
      this.clasificacionDominios.push(data);
      data= {nombre:'RED DE ACELERADORAS', identificador:'RED_ACELERADORAS'}
      this.clasificacionDominios.push(data);
    }else{
      this.nacional=false;
      let data;
      data= {nombre:'CIENTIFICA', identificador:'CIENTIFICA'}
      this.clasificacionDominios.push(data);
      data= {nombre:'LABORATORIO', identificador:'LABORATORIO'}
      this.clasificacionDominios.push(data);
      data= {nombre:'UNIVERSIDAD', identificador:'UNIVERSIDAD'}
      this.clasificacionDominios.push(data);
      data= {nombre:'RED DE ACELERADORAS', identificador:'RED_ACELERADORAS'}
      this.clasificacionDominios.push(data);
      data= {nombre:'TECNOLOGICOS', identificador:'TECNOLOGICOS'}
      this.clasificacionDominios.push(data);
      data= {nombre:'AUSJAL', identificador:'AUSJAL'}
      this.clasificacionDominios.push(data);
    }

    let el: any;
    el = document.getElementById("overlayAdicion");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }

  guardarCambios(){
    
    let pojoDominio ={
      nombre: this.dominio.nombre,
      url: this.dominio.url,
      nacional: this.nacional,
      activo : true,
      tipo : this.clasificacion
    }
    console.log(pojoDominio)

    this.directorioService.crearDominio(pojoDominio).subscribe(
      response =>{
        console.log(response);
        this.cerrarPopUp();
      },
      error=>{
        console.log('Error creando dominio');
      }
    )
  }

}
