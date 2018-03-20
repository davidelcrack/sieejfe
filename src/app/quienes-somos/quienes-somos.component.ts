import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Enlace } from '../modelo/about.model';

@Component({
  selector: 'app-quienes-somos',
  templateUrl: './quienes-somos.component.html',
  styleUrls: ['./quienes-somos.component.css']
})
export class QuienesSomosComponent implements OnInit {

  constructor() {
    this.dataSource = new MatTableDataSource(this.enlaces);
   }

  ngOnInit(
  ) {
    let data : Enlace;
    data ={
      id : 1,
      name : 'Principal',
      link : 'www.javeriana.edu.co'
    };
    this.enlaces.push(data);
    data ={
      id : 2,
      name : 'Telefono',
      link : 'www.javeriana.edu.co'
    };
    this.enlaces.push(data);
    data ={
      id : 3,
      name : 'Direccion',
      link : 'www.javeriana.edu.co'
    }
    this.enlaces.push(data);
  }
  
  displayedColumns = ['Nombre'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  enlaces = new Array();

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
    console.log(row);
    window.open('http://'+row.link,'_blank'); 
  }

  enlace=new Enlace();
  
  agregarEnlace(enlacePantalla : Enlace){       
    if(enlacePantalla==undefined){
      this.enlace=new Enlace();
    }else{
      this.enlace=enlacePantalla;
    }
    
    let el: any;
    el = document.getElementById("overlayAboutCrt");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }

  cambio(atributo : any , valor : any , tipo : any){
    console.log('cambio : entro a cambio');
    console.log(atributo, valor);

    //let mensaje = { id: this.dominio.id  , accion: 'editarInventarioImagen' , atributo: atributo , valor: valor , prioridad: true, tipoDato: tipo }
    //console.log(mensaje);

    /*let observable = this.serviceCola.agregarACola(mensaje);

    if (observable) {
      observable.subscribe(response => {
        console.log(response)            

      },
        error => {
          console.log("Error al editar descripcion imagen");
        });
    } */

  }

  cerrarPopUp(){
    console.log('cerrarPopUp : entro a cerrarPopUp');
    let el : any;
    el = document.getElementById("overlayAboutCrt");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }

  guardarCambios(){
    this.enlaces.push(this.enlace);
    this.cerrarPopUp();
    this.dataSource._updateChangeSubscription();
  }

}
