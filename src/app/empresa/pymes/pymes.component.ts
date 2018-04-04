import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pymes',
  templateUrl: './pymes.component.html',
  styleUrls: ['./pymes.component.css']
})
export class PymesComponent implements OnInit {

  constructor() { }

  @Input() arbol;

  dataNivel2 = new  Array ();
  ngOnInit() {
  }

  auxiliar= new  Array ();
  nombre:any;
  pedirDatos(nombre : any){
    console.log('pedirDatos : entro a pedirDatos');
    this.nombre=nombre
    this.auxiliar=[];
    this.dataNivel2=[];
 
    if(nombre=='datos'){
      let data_1={
        id:1, nombre: 'Datos 1.1.1', tieneHijos: true
      }
      this.dataNivel2.push(data_1);
      data_1={
        id:2, nombre: 'Datos 1.1.2', tieneHijos: false
      }
      this.dataNivel2.push(data_1);    
      this.auxiliar=this.dataNivel2;
    }

    if(nombre=='Datos 1.1.1'){
      let data_1={
        id:1, nombre: 'Jaja', tieneHijos: true
      }
      this.dataNivel2.push(data_1);
      data_1={
        id:2, nombre: 'Jojo', tieneHijos: false
      }
      this.dataNivel2.push(data_1);    
      this.auxiliar=this.dataNivel2;
    }

    if(nombre=='Jaja'){      
      let data_1={
        id:1, nombre: 'Holi', tieneHijos: false
      }
      this.dataNivel2.push(data_1);
      data_1={
        id:2, nombre: 'Chali', tieneHijos: false
      }
      this.dataNivel2.push(data_1);    
      this.auxiliar=this.dataNivel2;
    }    
  }

  verificar(acordeon){
    
    if(this.nombre==acordeon.nombre){
      if(acordeon.tieneHijos){
        return true;
      }else{
        console.log('Es final', acordeon.nombre);
      }
    }    
    return false;
  }

}
