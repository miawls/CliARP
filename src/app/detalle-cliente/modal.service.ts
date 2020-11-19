import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
    Modal :boolean = false;
  constructor() { }

  AbrirModal(){
    this.Modal = true;
  }
  CerrarModal(){
    this.Modal = false;
  }
}
