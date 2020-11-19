import swal from 'sweetalert2';
import { ClienteService } from './../clientes/cliente.service';
import { Cliente } from './../clientes/cliente';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpEventType } from '@angular/common/http';
import { ModalService } from './modal.service';
@Component({
  selector: 'app-detalle-cliente',
  templateUrl: './detalle-cliente.component.html',
  styleUrls: ['./detalle-cliente.component.css']
})
export class DetalleClienteComponent implements OnInit {

  @Input() Cliente: Cliente; //pasar los datos de la instancia por el decorador input dodne se este llamando

  fotoSeleccionada: File;
   progreso: number ;
  constructor(private clienteService: ClienteService,
    public modalServise: ModalService) { }

  ngOnInit(): void {

    // this.router.paramMap.subscribe(params => {
    //   let id: number = +params.get('id');
    //   if (id) {
    //     this.clienteService.getCliente(id).subscribe(cliente => {
    //       this.Cliente = cliente;
    //     })
    //   }
    // }
    // );
  }


  seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    console.log(this.fotoSeleccionada);
    if (this.fotoSeleccionada.type.indexOf("image") < 0) { //busca la palabra en una de las peticiones  si no existe le pone un -1
      swal.fire('Error ', `El tipo de archivo no es el correcto`, 'error');
    }
  }

  subirFoto() {
    if (!this.fotoSeleccionada) {
      swal.fire('Error ', `Se debe seleccionar una imagen `, 'error');
    } else {
      this.clienteService.subirFoto(this.fotoSeleccionada, this.Cliente.id).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progreso = Math.round((event.loaded / event.total) * 100);
        } else if (event.type === HttpEventType.Response) {

          let response: any = event.body;

          this.Cliente = response.cliente as Cliente;

         // console.log("datos del response" + Response);
          swal.fire('La foto ', ` <strong> ${this.Cliente.foto} </strong> se a subido con existo`, 'success');
        }
        // this.Cliente = cliente;


      });
    }
  }

  cerrarModal() {
    this.modalServise.CerrarModal();
    this.progreso = 0;
    this.fotoSeleccionada = null;
  }

}
