import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NotificationsService } from 'angular2-notifications';
import { InventarioService } from 'src/app/services/inventario.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {

  inventario: any;
  inventarioForm =  new FormGroup({
    Variedad: new FormControl('', Validators.required),
    Cantidad: new FormControl('', Validators.required)
  });

  constructor(public inventarioService: InventarioService, public noti: NotificationsService) { }

  ngOnInit(): void {

    this.inventarioService.getInventario().subscribe(data => {
      if(data){
        this.inventario = data.map(e => {
          return{
            Variedad: e.payload.doc.id,
            Calidad: e.payload.doc.data()['Calidad'],
            Cantidad: e.payload.doc.data()['Cantidad']
          }
        });
      }
    });


  }

  onSubmit(){
    this.inventarioService.agregarProducto(this.inventarioForm.value);
    this.inventarioForm.reset();
    this.noti.success('¡Éxito!', 'El registro de inventario se ha generado exitosamente',
            { position: ['bottom', 'right'], timeOut: 5000, animate: 'fade', showProgressBar: true });
  }

}

