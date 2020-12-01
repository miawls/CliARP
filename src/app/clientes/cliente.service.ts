import Swal from 'sweetalert2';
import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs'; // una sola importacion
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class ClienteService {
  private url: string = "http://localhost:8888/api/cliente";
  private reportProgress;
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient,
    private router: Router) { }


  getClientes(page: number): Observable<any> {
    return this.http.get(this.url + '/page/' + page).pipe(
      map((response: any) => {

        (response.content as Cliente[]).map((cliente: any) => {
          cliente.nombre = cliente.nombre.toUpperCase();
          cliente.apellido = cliente.apellido.toUpperCase();
          cliente.createAT = formatDate(cliente.createAT, 'dd-MM-yyyy', 'en-US');
          return response;
        });
        console.log(response);
        return response;

      })

    );

  }

  create(cliente: Cliente): Observable<any> {  // crear el metodo de insercion
    return this.http.post<any>(this.url, cliente, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
        Swal.fire({
          icon: 'error',
          title: 'error al crear',
          text: e.error.Mensaje
        });
        return throwError(e);
      })
    );
  }

  getCliente(id): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.url}/${id}`).pipe(
      catchError(e => {

        this.router.navigate(['/clientes']);
         
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: e.error.mensaje
        });
        return throwError(e);
      })
    );
  }
  update(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.url}/${cliente.id}`, cliente, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
        Swal.fire({
          icon: 'error',
          title: 'error al editar',
          text: e.error.Mensaje
        });
        return throwError(e);

      })
    );
  }


  delt(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.url}/${id}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        Swal.fire({
          icon: 'error',
          title: 'error al eliminar',
          text: e.error.Mensaje
        });
        return throwError(e);
      })
    );
  }

  subirFoto(archivo: File, id):Observable<HttpEvent<{}>> {

    let formData = new FormData();
    formData.append("archivo", archivo); //nombre que se le dio en el requesmaping
    formData.append("id", id); //nombre del parametro que resive

    const req = new HttpRequest('POST', `${this.url}/upload`, formData,{ //pide con request los datos  t regresa con lo adquido agregnado el progreso de lafodo
      reportProgress: true

    });
    console.log(req);
    return this.http.request(req);

    //return this.http.post(`${this.url}/upload/`, formData).pipe(
      //map((response: any) => response.cliente as Cliente),
      //catchError(e => {
       /// console.log(e.error.mensaje);
        //Swal.fire(e.error.mensaje, e.error.error, 'error');
        //return throwError(e);
      //})
   // )
  }

}
