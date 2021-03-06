import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientesComponent } from './clientes/clientes.component';
import {ClienteService} from './clientes/cliente.service';
import {HttpClientModule} from '@angular/common/http';
import { FormComponent } from './clientes/form.component'; //agrega la coeccion a api
import {FormsModule} from '@angular/forms';
import { PaginatorComponent } from './paginator/paginator.component';
import { DetalleClienteComponent } from './detalle-cliente/detalle-cliente.component';


@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    PaginatorComponent,
    FormComponent,
    DetalleClienteComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,

  ],
  providers: [ClienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
