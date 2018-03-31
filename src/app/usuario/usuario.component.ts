import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  constructor() {
    this.dataSource = new MatTableDataSource(this.usuarios);
   }

  esAdmin : boolean = false;

  ngOnInit(
  ) {
    this.esAdmin = JSON.parse(localStorage.getItem('ADMIN'));

    let data : any;
    data ={
      id : 1,
      name : 'David',
      progress : 'El crack',
      color : 'azul'
    };
    this.usuarios.push(data);
    data ={
      id : 2,
      name : 'Brayan',
      progress : 'El asaltador',
      color : 'rojo'
    };
    this.usuarios.push(data);
    data ={
      id : 3,
      name : 'Daniel',
      progress : 'El cerdito',
      color : 'verde'
    }
    this.usuarios.push(data);
  }
  
  displayedColumns = ['id', 'Nombre', 'Caracteristica', 'Color'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  usuarios = new Array();

  cerrarPopUp(){
	  console.log('cerrarPopUp : entro a cerrarPopUp');
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  prueba(row : any){
    console.log("++++++++++++++++++++++++++++++++++");
    console.log(row)
  }

  agregarUsuario(){
    console.log('agregarUniversidad : entro a agregarUniversidad');
    let data : any;
    data ={
      id : 4,
      name : 'Efrain',
      progress : 'El sensei',
      color : 'Dorado'
    };
    this.usuarios.push(data);
    this.dataSource._updateChangeSubscription();
  }

}
