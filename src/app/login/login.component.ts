import { Component, OnInit } from '@angular/core';
//import { EmbedVideoService } from 'ngx-embed-video';
import { LoginService } from '../servicios/autenticacion/login.service';
import { AppComponent } from '../app.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'SIEEJ';
  vimeoUrl = "https://vimeo.com/197933516";
  youtubeUrl = "https://www.youtube.com/watch?v=iHhcHTlGtRs";
  dailymotionUrl = "https://www.dailymotion.com/video/x20qnej_red-bull-presents-wild-ride-bmx-mtb-dirt_sport";
 
  vimeoId = "197933516";
  youtubeId = "iHhcHTlGtRs";
  dailymotionId = "x20qnej";

  datosLogin = { username: '', contrasena: '' };

  private usuarioLog =  Array ( new Object()); 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    //private embedService: EmbedVideoService,
    private servicioLogin: LoginService,
    private appComponent: AppComponent,
  ) { 
    //this.embedService.embed_image('https://www.youtube.com/watch?v=iHhcHTlGtRs', { image: 'mqdefault' })
  }

  ngOnInit() {
  }

  login() {
    console.log("login: Entro a login");   
    console.log(this.datosLogin);
    if(this.datosLogin.username!="" && this.datosLogin.contrasena!=""){   
        
      //this.servicioLogin.login(this.datosLogin.username, this.datosLogin.contrasena).subscribe(//no local
        //response => {//no local
          //console.log("USER",response);  //no local           
          //if(response===200){ //no local
            localStorage.setItem('TRADUJO', 'es-co');     
            localStorage.setItem('USER', this.datosLogin.username);    
            //this.usuarioRegistrado(this.datosLogin.username, this.datosLogin.contrasena); //no local
            localStorage.setItem('LOGGEADO', JSON.stringify(this.usuarioLog)); //si local
          //} //no local
          console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++');
          this.appComponent.esUser=true;
          this.router.navigate(['board']);
          
        //}, error => { //no local
       
          //console.log("**LOGIN***"+error); //no local
        //}  //no local
      //); //no local
     
    }
  }

  usuarioRegistrado(username: string, password: string) {
    console.log("usuarioRegistrado: Entro a usuarioRegistrado");
      
    this.servicioLogin.credencialesUsuario(username,password).subscribe(
      response => {          
        this.usuarioLog=response;                             
        console.log(this.usuarioLog);
        localStorage.setItem('LOGGEADO', JSON.stringify(this.usuarioLog));
        this.appComponent.comprobarEstado();
        //this.especificarPermisos();

      }, error => {
        alert("Error en el servidor retornando URD"); console.log("**URD***"+error);
      }      
    );     
  }

  keyDownFunction(e:any){
    if(e.which == 13) {
      console.log('Enter!');
      if(this.datosLogin.username!="" && this.datosLogin.contrasena!=""){
        this.login();
      }
    }
  }

}
