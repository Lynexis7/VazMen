import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InventarioService } from 'src/app/services/inventario.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {

  inventario: any;

  constructor(public inventarioService: InventarioService, public dialog: MatDialog) { }

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

  openDialog() {
    this.dialog.open(InventarioDialog);
  }

}

@Component({
  selector: 'inventario-dialog',
  templateUrl: 'inventario-dialog.html',
})
export class InventarioDialog {}
