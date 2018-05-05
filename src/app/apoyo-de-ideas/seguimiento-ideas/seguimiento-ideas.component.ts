import { Component, OnInit, ViewChild } from '@angular/core';
import { ApoyoIdeasService } from '../../servicios/apoyoIdeas/apoyo-ideas.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-seguimiento-ideas',
  templateUrl: './seguimiento-ideas.component.html',
  styleUrls: ['./seguimiento-ideas.component.css']
})
export class SeguimientoIdeasComponent implements OnInit {

  constructor(
    private apoyoIdeasService : ApoyoIdeasService,
  ) {
    this.dataSource = new MatTableDataSource(this.ideas);
   }

   esAdmin : boolean = false;

  ngOnInit() {
    this.esAdmin = JSON.parse(localStorage.getItem('ADMIN'));
    this.pedirIdeas(0);       
  }

  displayedColumns = ['titulo', 'autor', 'correo' ,'ver'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ideas = new Array();

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  idActual:any;

  pedirIdeas(id : any){
    this.idActual=id;

    this.ideas=[];
    this.dataSource = new MatTableDataSource(this.ideas);
    let data : any;
    this.apoyoIdeasService.listarIdeasSeguimiento().subscribe(
      response => {      
        debugger   
        console.log(response);        
        response.forEach(element => {          
                    
          data ={
            id: element.id,
            titulo : element.titulo ,
            autor : element.usuarioJaveriana.nombre + ' '+ element.usuarioJaveriana.apellidos,
            //estado: element.activa,
            correo : element.usuarioJaveriana.email,
            descripcion : element.descripcion,
            etiquetas : element.etiquetas
          };
          this.ideas.push(data);          
        });
        console.log(this.ideas);
        this.dataSource._updateChangeSubscription();
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort= this.sort;
        });
        
      }, error => {
        console.log("**Obtener las Ideas***"+error);
      }      
    );

  }

  idea = {id: -1 , titulo : "" ,  autor : ' ', correo : '' , descripcion : "", etiquetas:null};
  respuesta= null;
  abrirIdea(row : any){        
    this.idea=row;
    let el: any;
    el = document.getElementById("overlayDetalleDeIdea");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }

  cerrarPopUp(){
    console.log('cerrarPopUp : entro a cerrarPopUp');

    this.respuesta=null;
    this.idea = {id: -1 , titulo : "" ,  autor : ' ', correo : '' , descripcion : "", etiquetas:null};
    let el : any;
    el = document.getElementById("overlayDetalleDeIdea");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }

  enviar(){
    console.log('enviar : entro a enviar');

    let laRespueta = {id: this.idea.id , respuesta: this.respuesta}
    
    this.apoyoIdeasService.responderAIdea(laRespueta).subscribe(
      response => {         
        console.log(response); 
        this.cerrarPopUp();
        this.pedirIdeas(this.idActual);
      });

  }

}
