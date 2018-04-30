import { Component, OnInit ,ChangeDetectionStrategy, ViewChild, TemplateRef} from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarDateFormatter
} from 'angular-calendar';


import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { CustomDateFormatter } from '../pickers/custom-date-formatter.provider';
import { SuscriptoresComponent } from './suscriptores/suscriptores.component';
import { EventosService } from '../servicios/eventos/eventos.service';
import { concat } from 'rxjs/operator/concat';
import { ColaService } from '../servicios/cola/cola.service';
import { PopupAvisoComponent } from '../popup-aviso/popup-aviso.component';
import { constructDependencies } from '@angular/core/src/di/reflective_provider';
import { FormularioPersonalizadoComponent } from './formulario-personalizado/formulario-personalizado.component';
import { debounce } from 'rxjs/operators/debounce';
import { ListadoEventosComponent } from './listado-eventos/listado-eventos.component';


const colors: any = {
  blueJaverina: {
    primary: '#000066',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellowJaveriana: {
    primary: '#FFCC00',
    secondary: '#FDF1BA'
  }
};



@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})
export class EventoComponent implements OnInit {

  esAdmin : boolean = false;
  misContactos = false;

  @ViewChild(ListadoEventosComponent) listado: ListadoEventosComponent;

  ngOnInit() {
    
    this.cargarTodosLosEventos();

    this.esAdmin = JSON.parse(localStorage.getItem('ADMIN'));

    if(!this.esAdmin){
      this.actions=[];
    }   
    
    // data = {
    //   id: 1,
    //   start: subDays(startOfDay(new Date()), 1),
    //   end: addDays(new Date(), 1),
    //   title: 'Emprendimiento : El camino',
    //   color: colors.blueJaverina,
    //   actions: this.actions
    // };
    // this.events.push(data);

    // data={
    //   id: 2,
    //   start: startOfDay(new Date()),
    //   title: 'Evento sin fecha de finalización',
    //   color: colors.yellowJaveriana,
    //   actions: this.actions
    // };
    // this.events.push(data);
    
    // data={
    //   id: 3,
    //   start: subDays(endOfMonth(new Date()), 3),
    //   end: addDays(endOfMonth(new Date()), 3),
    //   title: 'Charla Google',
    //   color: colors.blue,
    //   actions: this.actions
    // };
    // this.events.push(data);

    // data={
    //   id: 4,
    //   start: addHours(startOfDay(new Date()), 2),
    //   end: new Date(),
    //   title: 'Hackaton 2018',
    //   color: colors.yellowJaveriana,
    //   actions: this.actions      
    // };
    // this.events.push(data);

  }

  constructor(
    private modal: NgbModal,
    private eventosService : EventosService,
    private colaService : ColaService
  ) {}

  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  @ViewChild(FormularioPersonalizadoComponent) formularioPersonalizadoComponent : FormularioPersonalizadoComponent 

  view: string = 'month';
  viewDate: Date = new Date();
  locale: string = 'es-CO';

  eventosTodos = new Array();
  detalleEvento : any;
  
  requisitosEvento : any;  
  descripcionEvento : any;
  capacidadMaxima : any;
  mostrarDetallesMas=false;
  mensajeTooTip="Filtrar por mis eventos";

  evento : any;
  usuario : any;
  suscrito : boolean =false;


  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        console.log(event);
        //this.handleEvent('Edited', event);
        this.abrirEdicionEvento(event.id);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        /*this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);*/
        this.eliminar(event.id);
      }
    },
    {
      label: '<i class="fa fa-plus-square"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        console.log(event);
        //this.handleEvent('Edited', event);
        this.abrirDetalleEventos(event.id);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    console.log('dayClicked : entro a dayClicked')

    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log('handleEvent : entro a handleEvent', action , event);
    // this.modalData = { event, action };
    // this.modal.open(this.modalContent, { size: 'lg' });
    this.abrirDetalleEventos(event.id);
  }

  addEvent(): void {
    this.events.push({
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.blueJaverina,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();
  }

  mostrarEventos=false;

  cerrarPopUp(){
    console.log('cerrarPopUp : entro a cerrarPopUp');
    this.mostrarEventos=false;
    this.mostrarDetallesMas=false; this.masDetallesClass= "custom-mostrar";
    this.atributosPersonalizados=[];

    this.validarCambios();
    
    let el : any;
    el = document.getElementById("overlayEvento");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }

  validarCambios(){
    if(this.accion==1){
      console.log('Edición : cerro Edición')
      this.events[this.idEditado]=this.eventsEditar[0];
      let idAct = this.events[this.idEditado].id;

      let index = this.eventosTodos.indexOf(this.eventosTodos.find( function (elementTodos){
        return elementTodos.id == idAct;
      }))

      this.eventosTodos[index].descripcion=this.descripcionEvento;
      this.eventosTodos[index].requisitos=this.requisitosEvento;
      if(this.capacidadMaxima != null){
        this.eventosTodos[index].capacidad_maxima=this.capacidadMaxima;
      }


    }
  }

  
  eventsEditar: CalendarEvent[];
  accion=undefined;
  idEditado=-1;

  /* ********** EDITAR ********** EDITAR ********** EDITAR ********** EDITAR ********** EDITAR ********** EDITAR ********** EDITAR ********** */

  abrirEdicionEvento(id : any){
    this.accion=1; this.descripcionEvento=null; this.requisitosEvento=null; this.capacidadMaxima=null;
    console.log('abrirEdicionEvento : entro a abrirEdicionEvento');
    console.log(this.events);
    let escogido = this.events.indexOf(this.events.find(function(element) {
      return element.id == id;
    }));    

    this.idActual=this.events[escogido].id;
    this.eventsEditar=[];
    this.eventsEditar.push(this.events[escogido]);
    this.idEditado=escogido;

    let index = this.eventosTodos.indexOf(this.eventosTodos.find( function (elementTodos){
      return elementTodos.id == id;
    }))

    this.descripcionEvento=this.eventosTodos[index].descripcion;
    this.requisitosEvento=this.eventosTodos[index].requisitos;

    if(this.eventosTodos[index].capacidad_maxima == -1){
      this.capacidadMaxima=null;
    }else{
      this.capacidadMaxima=this.eventosTodos[index].capacidad_maxima;
    }

    let el: any;
    el = document.getElementById("overlayEvento");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }


  /* ********** CREACION ********** CREACION ********** CREACION ********** CREACION ********** CREACION ********** CREACION ********** CREACION ********** */

  cont=100;   
  idActual:any=-1;
  abrirAdicionEvento(){
    console.log('abrirAdicionEvento : entro a abrirAdicionEvento');
    this.accion=2;
    this.eventsEditar=[];
    this.descripcionEvento=null; this.requisitosEvento=null; this.capacidadMaxima=null;

    // let mensaje = { id: 0  , accion: 'crearEvento' , prioridad: true, valor: 'ok'}
    // console.log(mensaje);

    // let observable = this.colaService.agregarACola(mensaje);

    // if (observable) {
    //   observable.subscribe(response => {
    //     console.log(response)            
    //     this.idActual=response[0].id;
    //     console.log(this.idActual);
    //   },
    //     error => {
    //       console.log("Error al crear evento");
    //     });
    // } 

    this.eventsEditar.push({
      id: 0,
      start: new Date(),
      end: new Date(),
      title: '',
      color: colors.blueJaverina,
      actions: this.actions      
    });
    //this.refresh.next();
    
    let el: any;
    el = document.getElementById("overlayEvento");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }

  abrirTodosEventos(){
    console.log('abrirAdicionEvento : entro a abrirAdicionEvento');
    this.listado.abrirPopUp(this.eventosTodos);
  }

  guardarCambios(){
    console.log('guardarCambios : entro a guardarCambios')

    

    if(this.accion==2){
      console.log('Adición : cerro Adición')
      let valido= this.comprobarLlenoTotal();
      if(valido){        
        this.agregarEvento();
      }
    }
    if(this.accion==1){
      console.log('Edición : cerro Edición')
      this.events[this.idEditado]=this.eventsEditar[0];
      this.cerrarPopUp();
    }
    if(this.accion==3){
      console.log('Listar : cerro Listar')
      this.events=this.eventsEditar;
      this.cerrarPopUp();
    }
    
    console.log(this.events);

  }

  comprobarLlenoTotal(){
    console.log(this.eventsEditar);
    
    if(this.eventsEditar[0].title==""){
      this.mensajeMostrar='Debe llenar todos los campos';
      this.avisar();
      return false;
    }
    if(this.eventsEditar[0].start>=this.eventsEditar[0].end){
      this.mensajeMostrar='La fecha inicial debe ser menor a la fecha final';
      this.avisar();
      return false;
    }     
    if(this.descripcionEvento==null || this.capacidadMaxima==null || this.requisitosEvento==null){
      this.mensajeMostrar='Debe llenar los detalles del evento';
      this.avisar();
      return false;
    }
    return true;   
    
  }

  agregarEvento(){
    console.log('agregarEvento : entro a agregarEvento');
    debugger
    let evento=this.eventsEditar[0];
    console.log(evento, this.atributosPersonalizados);

    let data;
    let eventoEnviar = new Array();
    data = {
      id:0,
      inicio: evento.start,
      fin: evento.end,
      titulo: evento.title,
      requisitos: this.requisitosEvento,
      descripcion: this.descripcionEvento,
      capacidad_maxima: this.capacidadMaxima,
      atrPersonalizados : this.atributosPersonalizados
    };

    eventoEnviar.push(data);
    this.eventosService.crearEvento(data).subscribe(
      response => {         
        this.cargarTodosLosEventos();
      }, error => {
        console.log("**obtenerEventos***"+error);
      }      
    ); 
    this.cerrarPopUp();
  }
  
  eliminar(id : any){

    let eliminado = this.events.indexOf(this.events.find(function(element) {
      return element.id == id;
    }));

    this.events.splice(eliminado, 1); 
    this.refresh.next()
  }

  /* ********** DETALLES ********** DETALLES ********** DETALLES ********** DETALLES ********** DETALLES ********** DETALLES ********** DETALLES ********** */

  @ViewChild(SuscriptoresComponent) inscripciones: SuscriptoresComponent;
  inscritoClass="";
  estaInscritoClass="";

  abrirDetalleEventos(idEvento: any){
    console.log('abrirDetalleEventos : entro a abrirDetalleEventos',idEvento);
    this.idActual=idEvento;  
    let detallado = this.events.indexOf(this.events.find(function(element) {
      return element.id == idEvento;
    }));
    this.detalleEvento=this.events[detallado].title;
    
    let indice = this.eventosTodos.indexOf( this.eventosTodos.find(function(element) {
      return element.id == idEvento;
    }));   
    
    this.descripcionEvento=this.eventosTodos[indice].descripcion;
    this.requisitosEvento=this.eventosTodos[indice].requisitos;
    if(this.eventosTodos[indice].capacidad_maxima == -1){
      this.capacidadMaxima='No se tiene un límite de capacidad';
    }else{
      this.capacidadMaxima=this.eventosTodos[indice].capacidad_maxima;
    }

    this.atributosPersonalizados=this.eventosTodos[indice].atrPersonalizados;
    

    this.evento=this.events[detallado].id;
    this.usuario=90;

    this.eventosService.estaInscrito(this.evento).subscribe(
      response => {         
        console.log(response);   
        this.suscrito=response;         
        if(this.suscrito){
          (<HTMLInputElement>document.getElementById('inscripcionFa')).className='fa fa-check';   
          (<HTMLInputElement>document.getElementById('labelInscripcionFa')).className='custom-inscrito';   
        }else{
          (<HTMLInputElement>document.getElementById('inscripcionFa')).className='fa fa-bell';   
          (<HTMLInputElement>document.getElementById('labelInscripcionFa')).className='custom-inscribir';   
        }
        
      }, error => {
        console.log("**Esta suscrito***"+error);
      }      
    ); 

    if(this.esAdmin){
      this.inscripciones.cargarDetalles(this.usuario, this.evento);
    }

    let el: any;
    el = document.getElementById("overlayInformacionEvento");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";

  }

  cerrarPopUpDetalle(){
    console.log('cerrarPopUpDetalle : entro a cerrarPopUpDetalle');    
    let el : any;
    el = document.getElementById("overlayInformacionEvento");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }


  suscribirse(){
    console.log('suscribirse : entro a suscribirse');
    this.mensajeMostrar='El evento ya ha alcanzado su capacidad máxima';
    let pasa = false;
    if(!this.suscrito){
      pasa = this.llenarFormulario();
    }else{
      pasa = true;
    }

    if(pasa){
      this.eventosService.suscribirse(this.idActual).subscribe(
        response => {         
          console.log(response);
          this.suscrito=response;
          if(response){
            (<HTMLInputElement>document.getElementById('inscripcionFa')).className='fa fa-check';   
            (<HTMLInputElement>document.getElementById('labelInscripcionFa')).className='custom-inscrito';   
          }else{
            (<HTMLInputElement>document.getElementById('inscripcionFa')).className='fa fa-bell';   
            (<HTMLInputElement>document.getElementById('labelInscripcionFa')).className='custom-inscribir';   
          }
        }, error => {
          this.mensajeMostrar='Ha ocurrido un error inscribiendose';
          this.avisar();
          console.log("**suscribirse***"+error);
        }      
      );
    }

  }

  llenarFormulario(){
    if(this.atributosPersonalizados.length>0){
      this.formularioPersonalizadoComponent.abrir(this.atributosPersonalizados);
      return false;      
    }else{
      return true;
    }
  }

  cambio(atributo : any , valor : any , tipo : any){
    console.log('cambio : entro a cambio');
    console.log(atributo, valor);

    if(atributo=='capacidadMaxima'){
      console.log(valor);
      let numero = parseInt(valor,10);
      console.log(numero, this.idActual);
      valor=numero;
    }

    if(this.accion==1){
      let mensaje = { id: this.idActual  , accion: 'editarEvento' , atributo: atributo , valor: valor , prioridad: true, tipoDato: tipo }
      
      console.log(mensaje);

      let observable = this.colaService.agregarACola(mensaje);

      if (observable) {
        observable.subscribe(response => {
          console.log(response)            

        },
          error => {
            console.log("Error al editar imagen");
          });
      } 
    }

  }

  mensajeMostrar : any;
  @ViewChild(PopupAvisoComponent) avisoPopUp: PopupAvisoComponent;
  avisar(){
    this.avisoPopUp.mostrarPop();
  }

  misContactosSt: any = "fa fa-address-book" ;
  mostrarMisEventos(){
    if(this.misContactos){
      this.misContactos=false;
      this.misContactosSt="fa fa-address-book"
      this.cargarTodosLosEventos();
      this.mensajeTooTip="Filtrar por mis eventos";
    }else{
      this.mensajeTooTip="Mostrar todos los eventos";
      this.misContactos=true;
      this.misContactosSt="fa fa-address-book-o"
      let data: CalendarEvent;
      this.eventosService.listarMisEventos().subscribe(
        response => {         
          console.log(response);                        
          this.events=[];

          this.eventosTodos=response;
          response.forEach(element => {          
            console.log('comienza : '+new Date(element.inicio))
            console.log('termina : '+new Date(element.fin))
            data = {
              id: element.id,
              start: new Date(element.inicio),
              end: new Date(element.fin),
              title: element.titulo,
              color: colors.yellowJaveriana,
              actions: this.actions, 
            };  
            this.events.push(data);
          });
        this.refresh.next();      

      });

    }
  }

  cargarTodosLosEventos(){
    let data: CalendarEvent;

    this.eventosService.obtenerEventos().subscribe(
      response => {         
        console.log(response);    
        this.events=[];    
        this.eventosTodos=response;
        response.forEach(element => {          
          console.log('comienza : '+new Date(element.inicio))
          console.log('termina : '+new Date(element.fin))
          data = {
            id: element.id,
            start: new Date(element.inicio),
            end: new Date(element.fin),
            title: element.titulo,
            color: colors.blueJaverina,
            actions: this.actions, 
          };  
          this.events.push(data);
        });
        this.refresh.next();
      }, error => {
        console.log("**obtenerEventos***"+error);
      }      
    ); 

  }

  masDetallesClass= "custom-mostrar"
  mostrarDetallesEdicion(){
    if(this.mostrarDetallesMas){
      this.mostrarDetallesMas=false;  
      this.masDetallesClass="custom-mostrar"    
    }else{
      this.mostrarDetallesMas=true;
      this.masDetallesClass="custom-mostrado";
    }
  }

  atributosPersonalizados = new Array();
  anadirAtributo(){

    let puedeAgregar=false;
    if(this.atributosPersonalizados.length>0){      
      let ultimo = this.atributosPersonalizados.length-1;

      if(this.atributosPersonalizados[ultimo].nombre != null){
        puedeAgregar=true;
      }
    }else{
      puedeAgregar=true;
    }

    if(puedeAgregar){

      
      let mensaje = { id: this.idActual  , accion: 'asociarAtrPersonalizadoEvento' , atributo: 'personalizado' , valor: 'ok' , prioridad: true, tipoDato: 'STRING' }
      
      console.log(mensaje);

      let data={
        id: null,
        nombre: null, 
        descripcion : null        
      }      
      this.atributosPersonalizados.push(data);
      if(this.accion==1){
        let observable = this.colaService.agregarACola(mensaje);

        if (observable) {
          observable.subscribe(response => {
            console.log(response)       
            
            if(response[0].accion=='crear'){

              let id=response[0].valor.id;

              let index= this.atributosPersonalizados.indexOf(this.atributosPersonalizados.find(function (buscadoElement){
                return buscadoElement.id==-1;
              }))
              
              this.atributosPersonalizados[index].id=id;

              console.log(this.atributosPersonalizados);

              }

          },
            error => {
              console.log("Error al editar imagen");
            });
        }    
      }
         
    }
  }

  cambioPersonalizado(atributo : any , valor : any , tipo : any, id: any){
    console.log('cambio : entro a cambio');
    console.log(this.atributosPersonalizados);
    console.log(atributo, valor, id);

    let mensaje = { id: id  , accion: 'editarAtrPersonalizado' , atributo: atributo , valor: valor , prioridad: true, tipoDato: tipo }
    
    console.log(mensaje);

    let observable = this.colaService.agregarACola(mensaje);

    if (observable) {
      observable.subscribe(response => {
        console.log(response)            

      },
        error => {
          console.log("Error al editar imagen");
        });
    } 

  }

  onNotifyInscribirse(e){
    this.eventosService.suscribirse(this.idActual).subscribe(
      response => {         
        console.log(response);
        this.suscrito=response;
        if(response){
          (<HTMLInputElement>document.getElementById('inscripcionFa')).className='fa fa-check';   
          (<HTMLInputElement>document.getElementById('labelInscripcionFa')).className='custom-inscrito';   
        }else{
          (<HTMLInputElement>document.getElementById('inscripcionFa')).className='fa fa-bell';   
          (<HTMLInputElement>document.getElementById('labelInscripcionFa')).className='custom-inscribir';   
        }
      }, error => {
        this.mensajeMostrar='El evento ya ha alcanzado su capacidad máxima';
        this.avisar();
        console.log("**suscribirse***"+error);
      }      
    );
  }

  // validarFechaInscribir(){
  //   debugger;
  //   let hoy = new Date();
  //   if(this.evento.fin>hoy){
  //     return false;
  //   }else{
  //     return true;
  //   }
  // }

  
}
