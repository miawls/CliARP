import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { CLIENTES } from './clientes.json';
import { ClienteService } from './cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',

})
export class ClientesComponent implements OnInit {
  clientes: Cliente[];
  cliente: Cliente;
  paginador: any;

  constructor(private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => { // agregamos un obserbable  y se inicia cada ves que lo utlizamos

      let page: number = + params.get('page');
      if(!page){
        page = 0;
      }
      this.clienteService.getClientes(page).subscribe(
        response => {this.clientes = response.content as Cliente[];
                     this.paginador = response;
          })
        ;
    });
  }
  borrar(cliente: Cliente): void {



    swal.fire({
      title: 'esta seguro?',
      text: "quieres borrar este cliente ",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar este registro!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delt(cliente.id).subscribe(
          reponse => {
            this.clientes.filter(cli => cli != cliente)
            swal.fire(
              'Deleted!',
              'Cliente eliminado con exito.',
              'success'
            )
            location.reload();
          }
        );
      }
    })



  }


}
