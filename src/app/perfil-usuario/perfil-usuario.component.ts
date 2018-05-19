import { Component, OnInit, ViewChild } from '@angular/core';
import { MisEventosComponent } from './mis-eventos/mis-eventos.component';
import { MisIdeasComponent } from './mis-ideas/mis-ideas.component';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {

  constructor() { }

  @ViewChild(MisEventosComponent) misEventos : MisEventosComponent
  @ViewChild(MisIdeasComponent) misIdeas : MisIdeasComponent

  ngOnInit() {
    this.misEventos.cargarLista();
    this.misIdeas.cargarLista();
  }

}
