import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { VentasService } from 'src/app/services/ventas.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  total: number = 0;
  costo: number = 0;
  variedad: any;
  ventasForm = new FormGroup({
    Variedad: new FormControl('', Validators.required),
    Costo: new FormControl('', Validators.required),
    Cantidad: new FormControl('', Validators.required),
    Pendiente: new FormControl(false, Validators.required)
  });
  dia: number = new Date().getDate();
  mes: number = new Date().getMonth();
  año: number = new Date().getFullYear();
  flag: boolean = false;
  ventasPendientes: any;

  constructor(public ventasService: VentasService, public noti: NotificationsService) { }

  ngOnInit(): void {
    this.ventasService.getVariedad().subscribe(data => {
      if (data) {
        this.variedad = data.map(e => {
          return {
            Variedad: e.payload.doc.id
          }
        });
      }
    });

    this.ventasService.getVentasPendientes().subscribe(data => {
      if(data) {
        this.ventasPendientes = data.map(e => {
          return {
            Fecha: e.payload.doc.data()['Dia'] + "/" + e.payload.doc.data()['Mes'] + "/" + e.payload.doc.data()['Año'],
            Producto: e.payload.doc.data()['Variedad'],
            Cantidad: e.payload.doc.data()['Cantidad'],
            Total: e.payload.doc.data()['totalVenta']
          }
        });
      }
    })

  }

  onSubmit() {
    let cont = 0;
    console.log(this.ventasForm.value);
    console.log(this.flag);
    this.ventasService.getCantidad(this.ventasForm.value.Variedad).subscribe(data => {
      if (data) {
        if (this.ventasForm.value.Cantidad > data[0].payload.doc.data()['Cantidad']) {
          this.noti.info('¡Advertencia!', 'No hay tanta cantidad de ' + this.ventasForm.value.Variedad + ' en existencia. Inténtelo de nuevo.',
            { position: ['bottom', 'right'], timeOut: 5000, animate: 'fade', showProgressBar: true });
        } else {
          this.ventasForm.value.totalVenta = this.total;
          this.ventasForm.value.Dia = this.dia;
          this.ventasForm.value.Mes = this.mes + 1;
          this.ventasForm.value.Año = this.año;
          if (this.ventasForm.value.Pendiente != true) {
            this.ventasForm.value.Pendiente = false;
          } else if(this.ventasForm.value.Pendiente == true){
            this.ventasForm.value.Saldo = this.ventasForm.value.totalVenta;
            this.ventasForm.value.totalVenta = 0;
          }
          cont++;
          if(cont == 1){
            this.ventasService.generarVenta(this.ventasForm.value);
            this.noti.success('¡Éxito!', 'La venta se ha generado exitosamente.',
            { position: ['bottom', 'right'], timeOut: 5000, animate: 'fade', showProgressBar: true });
          }
          
          this.ventasForm.reset();
          this.total = 0;
        }
      }
    });
  }

  getCosto(event) {
    this.costo = event.target.value;
  }

  getTotal(event) {
    this.total = this.costo * event.target.value;
  }

}
