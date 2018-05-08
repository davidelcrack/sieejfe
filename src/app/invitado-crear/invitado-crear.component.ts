import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-invitado-crear',
  templateUrl: './invitado-crear.component.html',
  styleUrls: ['./invitado-crear.component.css']
})
export class InvitadoCrearComponent implements OnInit {

  constructor(
    private appComponent : AppComponent
  ) { }

  ngOnInit() {
  }

  logout(){
    this.appComponent.logout();
  }

}
