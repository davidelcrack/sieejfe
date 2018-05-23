import { Component, OnInit, ViewChild } from '@angular/core';
import { ColaService } from '../servicios/cola/cola.service';
import { CorreosService } from '../servicios/correos/correos.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { PopupAvisoComponent } from '../popup-aviso/popup-aviso.component';

@Component({
  selector: 'app-administracion-correos',
  templateUrl: './administracion-correos.component.html',
  styleUrls: ['./administracion-correos.component.css']
})
export class AdministracionCorreosComponent implements OnInit {

  constructor(    
    private colaService : ColaService,
    private correosService : CorreosService
  ) {
    this.dataSource = new MatTableDataSource(this.correos);
   }

  elCorreo ={nombre : null, correo : null}

  ngOnInit(
  ) {
     this.listarCorreos();
  }
  
  displayedColumns = ['id', 'nombre', 'correo', 'eliminar'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  correos = new Array();

  listarCorreos(){

    this.correos=[];
    this.dataSource = new MatTableDataSource(this.correos);
    let data : any;
    this.correosService.get().subscribe(
      response => {      
        debugger   
        console.log(response);        
        response.forEach(element => {          
          data ={
            id : element.id,
            nombre : element.nombre,
            correo : element.correo
          };
          this.correos.push(data);          
        });
        console.log(this.correos);
        this.dataSource._updateChangeSubscription();
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort= this.sort;
        });
        
      }, error => {
        console.log("**obtenerCorreos***"+error);
      }      
    );

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
 
  correoActual : any;  
  crearCorreo(row : any){        
    let el: any;
    el = document.getElementById("overlayAdicionCorreos");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }

  cerrarPopUp(){
    console.log('cerrarPopUp : entro a cerrarPopUp');
    this.elCorreo ={nombre : null, correo : null}
    this.listarCorreos();
    let el : any;
    el = document.getElementById("overlayAdicionCorreos");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }

  guardarCambios(){

    this.correosService.crearCorreo(this.elCorreo).subscribe(
      response =>{
        debugger
        console.log(response);
        this.cerrarPopUp();
      },
      error=>{
        console.log('Error creando correo');
      }
    )
  }

  row : any = -1;
  mensajeMostrar : any;
  @ViewChild('admonCorreosPopUp') avisoPopUp: PopupAvisoComponent;
  
  eliminarCorreo(row : any){
    this.mensajeMostrar= '¿Está seguro que desea eliminar el elemento seleccionado?'
    this.row=row.id;
    PopupAvisoComponent.mostrarBotones=true;
  }

  confirmoCierre(e){    
    let mensaje = { id: this.row  , accion: 'eliminar' , clase: 'CorreosInstitucionales', atributo: 'ok' , valor: 'ok' , prioridad: true, tipoDato: 'STRING' }
    
    console.log(mensaje);

    let observable = this.colaService.agregarACola(mensaje);

    if (observable) {
      observable.subscribe(response => {
        console.log(response)            
        this.listarCorreos();
      },
        error => {
          console.log("Error al elminar correo");
        });
    }
  }

}
