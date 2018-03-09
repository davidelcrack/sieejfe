import { Component, OnInit, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-imagen-pop-up',
  templateUrl: './imagen-pop-up.component.html',
  styleUrls: ['./imagen-pop-up.component.css']
})
export class ImagenPopUpComponent implements OnInit {

  imagenSeleccionada : any;
  cargo=false;
  
  constructor(
    private element: ElementRef
  ) { }

  data: any;
  ngOnInit() { 
    this.data = {
      id:0,
      nombre:'temporal',
      imagen:'iVBORw0KGgoAAAANSUhEUgAAAcIAAAHCCAIAAADzel4SAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjdGMjIzMzBBNzFBOTExRTRCODlFQjIyMkZDNjhCMjI2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjdGMjIzMzBCNzFBOTExRTRCODlFQjIyMkZDNjhCMjI2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6N0YyMjMzMDg3MUE5MTFFNEI4OUVCMjIyRkM2OEIyMjYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6N0YyMjMzMDk3MUE5MTFFNEI4OUVCMjIyRkM2OEIyMjYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5iYIRuAAASgElEQVR42uzd+1Ya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'
    }   
  }

  mostrarImagenDominio = false;
  valid: boolean = false;
  uploadedImage = null;

  inicializarPop(){
  }

  /**
   * Permite elegir una imagen de usuario.
   * @param event 
   */
  changeListener(event) {
      console.log('changeListener : entro a changeListener');
      let reader;
      let image;
      let file = event.target.files[0];
      
      reader = new FileReader();
      image = this.element.nativeElement.querySelector('.img-thumbnail'); 
      this.cargo=true;      
      
    /*reader.onload = function(e) {
        var src = e.target.result;
        image.src = src;
      };

      reader.readAsDataURL(event.target.files[0]);*/

      if (!file.name.match(/.(jpg|jpeg|png)$/i)){
          let texto="La Imagen : "+ file.name +" no está permitida, solo se aceptan imágenes formato: JPG, JPEG o PNG";
          console.log(texto);
      }else if(file.size < 500000){

          reader.onload = function (e: any) {
              var src = e.target.result;
              image.src = src       
          };
          reader.readAsDataURL(file);
          this.uploadedImage = file;

      }else{
          let texto="La Imagen : "+ file.name +" no está permitida, imagen muy pesada. Máximo de 500 KB";
          console.log(texto);
      }
      this.upload();
  }

  /**
   * Permite al usuario subir una imagena la base de datos.
   */
  upload() {
    
    let formData = new FormData();
    formData.append('file',this.uploadedImage);
    console.log(this.uploadedImage);
    console.log(formData.append);
    /*this.inventarioService.upload(formData, this.idAsociado)
        .subscribe(response => {
            console.log(response);
          
            this.mostrarImagenDominio = false;
            this.notify.emit('Cargo imagen')
            
            },error => {
                
            }
        );   */     
  }

  @Output() notify : EventEmitter<any> = new EventEmitter <any>();  

  @Output() notifyDelete : EventEmitter<any> = new EventEmitter <any>();
  eliminarImagen(){
    console.log('eliminarImagen : entro a eliminarImagen');   
    
    /*this.inventarioService.deleteImagen(this.idAsociado , this.imagenSeleccionada.id).subscribe(response => {
      console.log(response);      
        this.notifyDelete.emit('Cargo imagen');
      });
    },
      error => {
        console.log("no se puede eliminar la imagen")
      });*/
    
  }

  /*
   cambio(imagen) {
    console.log(imagen)
    
    let mensaje = { id: imagen.id  , accion: 'editarInventarioImagen' , atributo: 'descripcion', valor: imagen.descripcion , prioridad: true, tipoDato: 'STRING' }
    
    console.log(mensaje);

    let observable = this.serviceCola.agregarACola(mensaje);

    if (observable) {
      observable.subscribe(response => {
        console.log(response)            

      },
        error => {
          console.log("Error al editar descripcion imagen");
        });
    }
  } 
*/

abrirImagenDominio(){
  console.log('abrirImagenDominio : entro a abrirImagenDominio');

  let el: any;
  el = document.getElementById("overlayImagen");
  el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
}

cerrarPopUp(){
  console.log('cerrarPopUp : entro a cerrarPopUp');
  this.mostrarImagenDominio=false;

  let el : any;
  el = document.getElementById("overlayImagen");
  el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
}

}
