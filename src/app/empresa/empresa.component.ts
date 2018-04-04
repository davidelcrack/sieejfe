import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {

  constructor() { }

  dataNivel1 = new  Array ();
  dataNivel2 = new  Array ();
  datos = new  Array ();
  ngOnInit() {

    let data_1={
      id:1,
      nombre: 'Datos 1.1.1',
      tieneHijos: false
    }

    this.dataNivel2.push(data_1);

    data_1={
      id:2,
      nombre: 'Datos 1.1.2',
      tieneHijos: false
    }

    this.dataNivel2.push(data_1);

    let data_2 ={
      id:3,
      nombre: 'Datos 1.1',
      //hijos : this.dataNivel2,
      tieneHijos: true
      
    }

    this.dataNivel1.push(data_2);

    this.dataNivel2=[];
    data_1={
      id:4,
      nombre: 'Datos 1.2.1',
      tieneHijos: false
    }    
    this.dataNivel2.push(data_1);

    data_1={
      id:5,
      nombre: 'Datos 1.2.2',
      tieneHijos: false
    }
    this.dataNivel2.push(data_1);

    data_2 ={
      id:6,
      nombre: 'Datos 1.2',
      //hijos : this.dataNivel2,
      tieneHijos: true
    }

    this.dataNivel1.push(data_2);

    let dataFinal ={
      id: 7,
      nombre: 'datos',
      //hijos : this.dataNivel1,
      tieneHijos: true
    }

    this.datos.push(dataFinal);


    console.log(this.datos);

  }

}
