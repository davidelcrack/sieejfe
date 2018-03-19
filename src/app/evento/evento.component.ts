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

  ngOnInit() {
    let data: CalendarEvent;
    
    data = {
      id: 1,
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'Evento crack de 3 días',
      color: colors.blueJaverina,
      actions: this.actions
    };
    this.events.push(data);

    data={
      id: 2,
      start: startOfDay(new Date()),
      title: 'Evento sin fecha de finalización',
      color: colors.yellowJaveriana,
      actions: this.actions
    };
    this.events.push(data);
    
    data={
      id: 3,
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'Evento que dura 2 meses',
      color: colors.blue,
      actions: this.actions
    };
    this.events.push(data);

    data={
      id: 4,
      start: addHours(startOfDay(new Date()), 2),
      end: new Date(),
      title: 'Evento de los cracks',
      color: colors.yellowJaveriana,
      actions: this.actions      
    };
    this.events.push(data);

  }

  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view: string = 'month';

  viewDate: Date = new Date();

  locale: string = 'es-CO';

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
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal) {}

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
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
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
    
    let el : any;
    el = document.getElementById("overlayEvento");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }

  
  eventsEditar: CalendarEvent[];
  accion=undefined;
  idEditado=-1;

  abrirEdicionEvento(id : any){
    this.accion=1;
    console.log('abrirEdicionEvento : entro a abrirEdicionEvento');
    console.log(this.events);
    let escogido = this.events.indexOf(this.events.find(function(element) {
      return element.id == id;
    }));
    this.eventsEditar=[];
    this.eventsEditar.push(this.events[escogido]);
    this.idEditado=escogido;

    let el: any;
    el = document.getElementById("overlayEvento");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }

  cont=100;   
  abrirAdicionEvento(){
    console.log('abrirAdicionEvento : entro a abrirAdicionEvento');
    this.accion=2;
    this.eventsEditar=[];

    this.eventsEditar.push({
      id: this.cont+=1,
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      title: 'Nuevo Evento',
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
    this.accion=3;
    this.eventsEditar=[];

    this.eventsEditar=this.events;
    
    //this.refresh.next();
    
    let el: any;
    el = document.getElementById("overlayEvento");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }

  guardarCambios(){
    console.log('guardarCambios : entro a guardarCambios')

    this.cerrarPopUp();

    if(this.accion==2){
      console.log('Adición : cerro Adición')
      this.events.push(this.eventsEditar[0]);
      this.refresh.next();
    }
    if(this.accion==1){
      console.log('Edición : cerro Edición')
      this.events[this.idEditado]=this.eventsEditar[0];
    }
    if(this.accion==3){
      console.log('Listar : cerro Listar')
      this.events=this.eventsEditar;
    }
    
    console.log(this.events);

  }
  
  eliminar(id : any){

    let eliminado = this.events.indexOf(this.events.find(function(element) {
      return element.id == id;
    }));

    this.events.splice(eliminado, 1); 
    this.refresh.next()
  }
  
}
