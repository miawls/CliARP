import swal from 'sweetalert2';

import { ClienteService } from './../clientes/cliente.service';
import { Cliente } from './../clientes/cliente';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-detalle-cliente',
  templateUrl: './detalle-cliente.component.html',
  styleUrls: ['./detalle-cliente.component.css']
})
export class DetalleClienteComponent implements OnInit {

  Cliente: Cliente;

  private fotoSeleccionada: File;

  constructor(private clienteService: ClienteService, private router: ActivatedRoute,
    private Router: Router) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      let id: number = +params.get('id');
      if (id) {
        this.clienteService.getCliente(id).subscribe(cliente => {
          this.Cliente = cliente;
        })
      }
    }
    );
  }


  seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    console.log(this.fotoSeleccionada);
    if (this.fotoSeleccionada.type.indexOf("image") <0) {
      swal.fire('Error ', `El tipo de archivo no es el correcto`, 'error');
    }
  }

  subirFoto() {
    if (!this.fotoSeleccionada) {
      swal.fire('Error ', `Se debe seleccionar una imagen `, 'error');
    } else {
      this.clienteService.subirFoto(this.fotoSeleccionada, this.Cliente.id).subscribe(cliente => {

        this.Cliente = cliente;
        this.Router.navigate(['/clientes'])
        swal.fire('La foto ', ` <strong> ${this.Cliente.foto} </strong> se a subido con existo`, 'success');
      });
    }
  }
}
