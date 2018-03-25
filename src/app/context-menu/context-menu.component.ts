import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css']
})
export class ContextMenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() x=0;
  @Input() y=0;
  @Input() tab;

  @Output() cerrarNotify : EventEmitter<any> = new EventEmitter <any>();  
  @Output() cerrarTodasNotify : EventEmitter<any> = new EventEmitter <any>();  
  @Output() cerrarDemasNotify : EventEmitter<any> = new EventEmitter <any>();  

  cerrar(){
    console.log('cerrar : entro a cerrar', this.tab);
    this.cerrarNotify.emit(this.tab);
  }

  cerrarTodas(){
    console.log('cerrarTodas : entro a cerrarTodas',this.tab);
    this.cerrarTodasNotify.emit('todas');
  }

  cerrarDemas(){
    console.log('cerrarDemas : entro a cerrarDemas', this.tab);
    this.cerrarDemasNotify.emit(this.tab);
  }

}
