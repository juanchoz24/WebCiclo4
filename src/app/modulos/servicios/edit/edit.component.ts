import { emitDistinctChangesOnlyDefaultValue } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioModel } from 'src/app/modelos/servicio.model';
import { ServicioService } from 'src/app/servicios/servicio.service';
import {formatDate} from '@angular/common';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private servicioService: ServicioService,
    private router: Router,
    private route: ActivatedRoute) { }

    fgValidacion = this.fb.group({
      id: ['', [Validators.required]],
      origen: ['', [Validators.required]],
      destino: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      hora: ['', [Validators.required]],
      encomienda: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      
    });
 
    id: string=''
  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]
    this.getWithId(this.id);
  }
getWithId(id: string){
    this.servicioService.getWithId(id).subscribe((data: ServicioModel) => {
      console.log(data)
      this.fgValidacion.controls["id"].setValue(id);
      this.fgValidacion.controls["origen"].setValue(data.origen as string);
      this.fgValidacion.controls["destino"].setValue(data.destino as string);
      this.fgValidacion.controls["fecha"].setValue(data.fecha as string);
      //formatDate(this.fgValidacion.controls["fecha"].setValuee(data.fecha as string),'yyyy-MM-dd',locale);
      this.fgValidacion.controls["hora"].setValue(data.hora as string);
      this.fgValidacion.controls["encomienda"].setValue(data.encomienda as string);
      this.fgValidacion.controls["valor"].setValue(data.valor as unknown as string);
      
    })
  }
  edit(){
    let servicio = new ServicioModel();
    servicio.id = this.fgValidacion.controls["id"].value as string;
    servicio.origen = this.fgValidacion.controls["origen"].value as string;
    servicio.destino = this.fgValidacion.controls["destino"].value as string;
    servicio.fecha = this.fgValidacion.controls["fecha"].value as string;
    servicio.hora = this.fgValidacion.controls["hora"].value as string;
    servicio.encomienda = this.fgValidacion.controls["encomienda"].value as string;
    servicio.valor = this.fgValidacion.controls["valor"].value as unknown as number;
     
    this.servicioService.update(servicio).subscribe((data: ServicioModel)=> {
      Swal.fire('Editado Correctamente!', '', 'success')
      this.router.navigate(['/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }

}
