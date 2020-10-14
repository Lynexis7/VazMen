import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProveedoresService } from 'src/app/services/proveedores.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  proveedores: any;
  proveedoresForm = new FormGroup({
    Proveedor: new FormControl('', Validators.required),
    Salida: new FormControl('', Validators.required),
    Procedencia: new FormControl('', Validators.required),
    Remision: new FormControl('', Validators.required),
    PesoEmbasado: new FormControl('', Validators.required),
    Arpillas: new FormControl('', Validators.required),
    PesoArp: new FormControl('', Validators.required),
    Fecha: new FormControl(new Date(), Validators.required),
    PesoRec: new FormControl(new Date(), Validators.required),
    Merma: new FormControl(new Date(), Validators.required),
  });
  date = new FormControl(new Date().toUTCString());

  constructor(public proveedoresService: ProveedoresService) { }

  ngOnInit(): void {
    this.proveedoresService.getProveedores().subscribe(data => {
      if(data){
        this.proveedores = data.map(e => {
          return {
            Nombre: e.payload.doc.data()['Nombre']
          }
        });
      }
    });
  }

  onSubmit(){

  }

}
