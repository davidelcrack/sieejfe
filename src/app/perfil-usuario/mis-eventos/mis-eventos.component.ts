import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { EventosService } from '../../servicios/eventos/eventos.service';

@Component({
  selector: 'app-mis-eventos',
  templateUrl: './mis-eventos.component.html',
  styleUrls: ['./mis-eventos.component.css']
})
export class MisEventosComponent implements OnInit {

  constructor(
    private eventosService : EventosService,
  ) {
    this.dataSource = new MatTableDataSource(this.misEventosLista);
   }

  misEventosLista = new Array();
  displayedColumns = ['id', 'Titulo', 'Inicio', 'Fin'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
  }

  cargarLista(){    
    let data : any;    
    this.misEventosLista=[];
    this.dataSource = new MatTableDataSource(this.misEventosLista);    
    
    this.eventosService.listarMisEventos().subscribe(
      response => {

        debugger
        
        response.forEach(element => {
          let fechaInicio = new Date(element.inicio);
          let fechaFin = new Date(element.fin);
          data = {
            id: element.id,
            titulo: element.titulo,
            inicio: fechaInicio.getDate() + '/' + (fechaInicio.getMonth() + 1) + '/' + fechaInicio.getFullYear(),
            fin: fechaFin.getDate() + '/' + (fechaFin.getMonth() + 1) + '/' + fechaFin.getFullYear()
          };
          this.misEventosLista.push(data);
        });

        this.dataSource._updateChangeSubscription();
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });

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

}
