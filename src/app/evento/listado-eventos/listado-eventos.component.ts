import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-listado-eventos',
  templateUrl: './listado-eventos.component.html',
  styleUrls: ['./listado-eventos.component.css']
})
export class ListadoEventosComponent implements OnInit {

  constructor() {
    this.dataSource = new MatTableDataSource(this.eventosLista);
   }

  eventosLista = new Array();
  displayedColumns = ['id', 'Titulo', 'Inicio', 'Fin'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
  }

  cargarLista(eventos){    
    let data : any;    
    this.eventosLista=[];
    this.dataSource = new MatTableDataSource(this.eventosLista);       
    
    eventos.forEach(element => {
      let fechaInicio= new Date(element.inicio);
      let fechaFin= new Date(element.fin);          
      data ={
        id: element.id,
        titulo : element.titulo,
        inicio  : fechaInicio.getDate()+'/'+(fechaInicio.getMonth()+1)+'/'+ fechaInicio.getFullYear(),
        fin : fechaFin.getDate()+'/'+(fechaFin.getMonth()+1)+'/'+ fechaFin.getFullYear()
      };
      this.eventosLista.push(data);          
    });
    
    this.dataSource._updateChangeSubscription();
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort= this.sort;
    });
    
      

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


  abrirPopUp(eventos){
    console.log('cerrarPopUp : entro a cerrarPopUp');
    this.cargarLista(eventos);
    let el : any;
    el = document.getElementById("overlayListadoEventos");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }

  cerrarPopUp(){
    console.log('cerrarPopUp : entro a cerrarPopUp');
        
    let el : any;
    el = document.getElementById("overlayListadoEventos");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }

}
