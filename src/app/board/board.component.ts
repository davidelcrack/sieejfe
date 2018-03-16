import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  constructor(
    private appComponent : AppComponent
  ) { }

  ngOnInit() {
    this.llamarServicio();
  }

  llamarServicio(){
    console.log('llamarServicio : entro a llamarServicio');
  }

  clickImagen(nombre : any){
    console.log("clickImagen : entro a clickImagen");
    this.appComponent.openTabs(nombre);
  }

}
