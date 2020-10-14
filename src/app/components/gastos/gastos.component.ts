import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { GastosService } from 'src/app/services/gastos.service';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css']
})
export class GastosComponent implements OnInit {

  gastosForm = new FormGroup({
    Nombre: new FormControl('', Validators.required),
    Cantidad: new FormControl('', Validators.required)
  });
  dia: number = new Date().getDate();
  mes: number = new Date().getMonth();
  año: number = new Date().getFullYear();

  constructor(public gastosService: GastosService, public noti: NotificationsService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.gastosForm.valid){
      this.gastosForm.value.Dia = this.dia;
      this.gastosForm.value.Mes = this.mes + 1;
      this.gastosForm.value.Año = this.año;
      this.gastosService.insertarGasto(this.gastosForm.value);
      this.noti.success('¡Éxito!', 'El gasto se ha generado exitosamente.',
      { position: ['bottom', 'right'], timeOut: 5000, animate: 'fade', showProgressBar: true });
      this.gastosForm.reset();
    } else {
      this.noti.error('Error!', 'Hubo un error, intente de nuevo.',
      { position: ['bottom', 'right'], timeOut: 5000, animate: 'fade', showProgressBar: true });
    }
  }

}
