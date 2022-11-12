import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClienteModel } from '../modelos/cliente.model';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url = "http://localhost:3000"
  token: string = ''
  constructor(private http: HttpClient,
    private seguridadService: SeguridadService) {
      this.token = this.seguridadService.getToken();
}

store(cliente: ClienteModel): Observable<ClienteModel> {
  return this.http.post<ClienteModel>(`${this.url}/cliente`, {
    cedula: cliente.cedula,
    nombre: cliente.nombre,
    apellidos: cliente.apellidos,
    pais: cliente.pais,
    ciudad: cliente.ciudad,
    departamento: cliente.departamento,
    direccion: cliente.direccion,
    telefono: cliente.telefono,
    email: cliente.email
  });
}

getAll(): Observable<ClienteModel[]>{
  return this.http.get<ClienteModel[]>(`${this.url}/cliente`, {
    headers: new HttpHeaders({
      "Authorization": `Bearer ${this.token}`
    })
  })
}
update(cliente: ClienteModel): Observable<ClienteModel> {
  return this.http.patch<ClienteModel>(`${this.url}/cliente/${cliente.id}`, {
    cedula: cliente.cedula,
    nombre: cliente.nombre,
    apellidos: cliente.apellidos,
    pais: cliente.pais,
    ciudad: cliente.ciudad,
    departamento: cliente.departamento,
    direccion: cliente.direccion,
    telefono: cliente.telefono,
    email: cliente.email
  }, {
    headers: new HttpHeaders({
      "Authorization": `Bearer ${this.token}`
    })
  });
}
delete(id: string): Observable<ClienteModel[]>{
  return this.http.delete<ClienteModel[]>(`${this.url}/cliente/${id}`, {
    headers: new HttpHeaders({
      "Authorization": `Bearer ${this.token}`
    })
  })
}
getWithId(id: string): Observable<ClienteModel>{
  return this.http.get<ClienteModel>(`${this.url}/cliente/${id}`,{
    headers: new HttpHeaders({
      "Authorization": `Bearer ${this.token}`
    })
  })
}
}