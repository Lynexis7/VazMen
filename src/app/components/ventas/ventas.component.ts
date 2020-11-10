import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { VentasService } from 'src/app/services/ventas.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css'],
  providers: [DatePipe]
})
export class VentasComponent implements OnInit {

  total: number = 0;
  costo: number = 0;
  variedad: any;
  ventasForm = new FormGroup({
    Variedad: new FormControl('', Validators.required),
    Costo: new FormControl('', Validators.required),
    Cantidad: new FormControl('', Validators.required),
    Nombre: new FormControl('', Validators.required),
    Proveedor: new FormControl('', Validators.required)
  });
  dia: number = new Date().getDate();
  mes: number = new Date().getMonth();
  año: number = new Date().getFullYear();
  flag: boolean = false;
  ventasPendientes: any;
  proveedores: any;
  ventasDia: any;

  constructor(public ventasService: VentasService, public noti: NotificationsService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.ventasService.getVariedad().subscribe(data => {
      if (data) {
        this.variedad = data.map(e => {
          return {
            Variedad: e.payload.doc.id
          }
        });
      }

      this.ventasService.getProveedores().subscribe(data => {
        if (data) {
          this.proveedores = data.map(e => {
            return {
              Nombre: e.payload.doc.data()['Nombre']
            }
          });
        }
      });
    });

    this.ventasService.getVentasPendientes().subscribe(data => {
      if (data) {
        this.ventasPendientes = data.map(e => {
          return {
            id: e.payload.doc.id,
            Fecha: e.payload.doc.data()['Dia'] + "/" + e.payload.doc.data()['Mes'] + "/" + e.payload.doc.data()['Año'],
            Producto: e.payload.doc.data()['Variedad'],
            Proveedor: e.payload.doc.data()['Proveedor'],
            Cantidad: e.payload.doc.data()['Cantidad'],
            Total: e.payload.doc.data()['totalVenta']
          }
        });
      }
    });

    this.ventasService.getVentasDelDia().subscribe(data => {
      if (data) {
        this.ventasDia = data.map(e => {
          return {
            Fecha: e.payload.doc.data()['Dia'] + "/" + e.payload.doc.data()['Mes'] + "/" + e.payload.doc.data()['Año'],
            Proveedor: e.payload.doc.data()['Proveedor'],
            Variedad: e.payload.doc.data()['Variedad'],
            Cantidad: e.payload.doc.data()['Cantidad'],
            Total: e.payload.doc.data()['Saldo']
          }
        });

        console.log(this.ventasDia)
      }
    });

  }

  onSubmit() {
    let cont = 0;
    console.log(this.flag);
    console.log(this.ventasForm.value);
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
          if (this.ventasForm.value.Nombre == "" || this.ventasForm.value.Nombre == undefined) {
            this.ventasForm.value.Saldo = this.ventasForm.value.totalVenta;
            this.ventasForm.value.totalVenta = 0;
            this.ventasForm.value.Pendiente = false;
          } else {
            this.ventasForm.value.Pendiente = true;
          }
          console.log(this.ventasForm.value);
          cont++;
          if (cont == 1) {
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

  editVentaPendiente(vp) {
    vp.isEditable = true;
    let date = this.datePipe.transform(vp.Fecha, "MM/dd/yyyy");
    vp.EditFecha = date;
    vp.EditVariedad = vp.Producto;
    vp.EditCantidad = vp.Cantidad;
  }

  actualizarVentaPendiente(item) {
    let vp = {};
    let dateParts: string [] = item.EditFecha.split("/");
    let dia = dateParts[0];
    let mes = dateParts[1];
    let año = dateParts[2];
    vp['Dia'] = dia;
    vp['Mes'] = mes;
    vp['Año'] = año;
    vp['Variedad'] = item.EditVariedad;
    vp['Cantidad'] = item.EditCantidad;
    vp['Saldo'] = item.Saldo;
    vp['totalVenta'] = 0;
    vp['Proveedor'] = item.Proveedor;
    this.ventasService.actualizarVentaPendiente(vp, item.id);
    this.noti.success('¡Éxito!', 'La venta se ha actualizado exitosamente.',
      { position: ['bottom', 'right'], timeOut: 5000, animate: 'fade', showProgressBar: true });
  }

}
