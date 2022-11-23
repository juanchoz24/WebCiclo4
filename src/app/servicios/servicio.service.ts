import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServicioModel } from '../modelos/servicio.model';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  url = "https://apiloopbackgrupo65e4.herokuapp.com/"
  token: string = ''
  constructor(private http: HttpClient,
    private seguridadService: SeguridadService) {
      this.token = this.seguridadService.getToken();
}

store(servicio: ServicioModel): Observable<ServicioModel> {
  return this.http.post<ServicioModel>(`${this.url}/servicios`, {
    origen: servicio.origen,
    destino: servicio.destino,
    fechaHora: servicio.fechaHora,
    //hora: servicio.hora,
    encomienda: servicio.encomienda,
    valor: servicio.valor
  });
}

getAll(): Observable<ServicioModel[]>{
  return this.http.get<ServicioModel[]>(`${this.url}/servicios`, {
    headers: new HttpHeaders({
      "Authorization": `Bearer ${this.token}`
    })
  })
}
update(servicio: ServicioModel): Observable<ServicioModel> {
  return this.http.patch<ServicioModel>(`${this.url}/servicios/${servicio.id}`, {
    origen: servicio.origen,
    destino: servicio.destino,
    fechaHora: servicio.fechaHora,
    //hora: servicio.hora,
    encomienda: servicio.encomienda,
    valor: servicio.valor
  }, {
    headers: new HttpHeaders({
      "Authorization": `Bearer ${this.token}`
    })
  });
}
delete(id: string): Observable<ServicioModel[]>{
  return this.http.delete<ServicioModel[]>(`${this.url}/servicios/${id}`, {
    headers: new HttpHeaders({
      "Authorization": `Bearer ${this.token}`
    })
  })
}
getWithId(id: string): Observable<ServicioModel>{
  return this.http.get<ServicioModel>(`${this.url}/servicios/${id}`,{
    headers: new HttpHeaders({
      "Authorization": `Bearer ${this.token}`
    })
  })
}
}
