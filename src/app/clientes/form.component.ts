import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
@Component({

  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  cliente: Cliente = new Cliente // alta de clientes y llamar el cliente
   errores: string[];
  titulo: string = "crear cliente";
  constructor(private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente();
  }

  cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.clienteService.getCliente(id).subscribe(cliente => this.cliente = cliente)
      }
    })
  }


  public create(): void {

    console.log("Click");
    console.log(this.cliente);

    this.clienteService.create(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes'])
        swal.fire('Nuevo cliente', `Cliente <strong> ${cliente.nombre} </strong> creado con existo`, 'success')
      },
      err => {
        this.errores = err.error.errors as string[];
        console.log(err.error.errors);
      }
    );

  }
  public actualizar(): void {
    this.clienteService.update(this.cliente).subscribe(cliente => {
      this.router.navigate(["/clientes"])
      swal.fire('Se actualizo el cliente', `Cliente <strong> ${cliente.nombre} </strong> con existo`, 'success')
    },
      err => {
        this.errores = err.error.errors as string[];
        console.log(err.error.errors);
      }
    )
  }


}


