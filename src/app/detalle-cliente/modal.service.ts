import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  Modal: boolean = false;
  private _notificarFoto = new EventEmitter<any>();
  constructor() { }

  AbrirModal() {
    this.Modal = true;
  }
  CerrarModal() {
    this.Modal = false;
  }
  get notificarFoto(): EventEmitter<any> {
    return this._notificarFoto;
  }

}
