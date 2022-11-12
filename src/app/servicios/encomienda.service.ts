import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EncomiendaModel } from '../modelos/encomienda.model';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class EncomiendaService {

  url = "http://localhost:3000"
  token: string = ''
  constructor(private http: HttpClient,
    private seguridadService: SeguridadService) {
      this.token = this.seguridadService.getToken();
}

store(encomienda: EncomiendaModel): Observable<EncomiendaModel> {
  return this.http.post<EncomiendaModel>(`${this.url}/encomienda`, {
    descripcion: encomienda.descripcion,
    peso: encomienda.peso,
    tipo: encomienda.tipo,
    presentacion: encomienda.peso
  });
}

getAll(): Observable<EncomiendaModel[]>{
  return this.http.get<EncomiendaModel[]>(`${this.url}/encomienda`, {
    headers: new HttpHeaders({
      "Authorization": `Bearer ${this.token}`
    })
  })
}
update(encomienda: EncomiendaModel): Observable<EncomiendaModel> {
  return this.http.patch<EncomiendaModel>(`${this.url}/encomienda/${encomienda.id}`, {
    descripcion: encomienda.descripcion,
    peso: encomienda.peso,
    tipo: encomienda.tipo,
    presentacion: encomienda.peso
  }, {
    headers: new HttpHeaders({
      "Authorization": `Bearer ${this.token}`
    })
  });
}
delete(id: string): Observable<EncomiendaModel[]>{
  return this.http.delete<EncomiendaModel[]>(`${this.url}/encomienda/${id}`, {
    headers: new HttpHeaders({
      "Authorization": `Bearer ${this.token}`
    })
  })
}
getWithId(id: string): Observable<EncomiendaModel>{
  return this.http.get<EncomiendaModel>(`${this.url}/Encomienda/${id}`,{
    headers: new HttpHeaders({
      "Authorization": `Bearer ${this.token}`
    })
  })
}
}