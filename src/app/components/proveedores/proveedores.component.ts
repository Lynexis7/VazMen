import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  proveedores: any;
  proveedoresForm = new FormGroup({
    Proveedor: new FormControl('', Validators.required),
    CajasEntregadas: new FormControl('', Validators.required),
    Procedencia: new FormControl('', Validators.required),
    Variedad: new FormControl('', Validators.required),
    Remision: new FormControl('', Validators.required),
    PesoEmbasado: new FormControl('', Validators.required),
    Arpillas: new FormControl('', Validators.required),
    Cajas: new FormControl('', Validators.required),
    Fecha: new FormControl(new Date(), Validators.required),
    PesoRec: new FormControl(new Date(), Validators.required),
    Merma: new FormControl(new Date(), Validators.required)
  });

  tablaForm = new FormGroup({
    NoBultos1: new FormControl('', Validators.required),
    NoBultos2: new FormControl('', Validators.required),
    NoBultos3: new FormControl('', Validators.required),
    NoBultos4: new FormControl('', Validators.required),
    NoBultosM: new FormControl('', Validators.required),
    NoBultosMono: new FormControl('', Validators.required),
    NoBultosO: new FormControl('', Validators.required)
  })

  date = new FormControl(new Date().toUTCString());
  kgsArp: number = 0;
  kgsRecibido: number = 0;
  DescMerma: number = 0;
  totalKgsDesc: number = 0;
  total: number = 0;
  totalKgsNeto: number = 0;
  precio: number = 0;
  kgsRecibido2: number = 0;
  DescMerma2: any = 0;
  totalKgsDesc2: number = 0;
  totalKgsNeto2: number = 0;
  kgsRecibido3: number = 0;
  DescMerma3: any = 0;
  totalKgsDesc3: number = 0;
  totalKgsNeto3: number = 0;
  total2: number = 0;
  total3: number = 0;
  kgsRecibido4: number = 0;
  DescMerma4: any = 0;
  totalKgsDesc4: number = 0;
  totalKgsNeto4: number = 0;
  kgsRecibidoM: number = 0;
  DescMermaM: any = 0;
  totalKgsDescM: number = 0;
  totalKgsNetoM: number = 0;
  kgsRecibidoMono: number = 0;
  DescMermaMono: any = 0;
  totalKgsDescMono: number = 0;
  totalKgsNetoMono: number = 0;
  kgsRecibidoO: number = 0;
  DescMermaO: any = 0;
  totalKgsDescO: number = 0;
  totalKgsNetoO: number = 0;
  total4: number = 0;
  totalM: number = 0;
  totalMono: number = 0;
  totalO: number = 0;
  totalGeneral: number = 0;
  usuarios: any;
  admin: boolean;
  tipo: any;
  constructor(public proveedoresService: ProveedoresService, public auth: AuthService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.proveedoresService.getProveedores().subscribe(data => {
      if (data) {
        this.proveedores = data.map(e => {
          return {
            Nombre: e.payload.doc.data()['Nombre']
          }
        });
      }
    });

    switch (this.auth.user) {
      case "Ventas":
        this.admin = true;
        break;
      case "Admin":
        this.admin = false;
        break;
      default:
        break;
    }

  }

  onSubmit() {
    let data = document.getElementById('proveedores');

    window.scrollTo(0, 0);
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 240;
      var imgHeight = canvas.height * imgWidth / canvas.width;

      const contentDataURL = canvas.toDataURL('image/png', 1.0);
      var pdf = new jspdf('l', 'mm', 'a4');

      window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
      
      pdf.addImage(contentDataURL, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${this.proveedoresForm.controls.Proveedor.value}-reporte.pdf`); // Generated PDF
    });


    if (this.tablaForm.controls.NoBultos1.value != undefined) {
      let inv = {};
      inv['Variedad'] = this.proveedoresForm.controls.Variedad.value;
      inv['Cantidad'] = this.tablaForm.controls.NoBultos1.value;
      inv['Calidad'] = "1ra";
      console.log(inv)
      this.proveedoresService.agregarInventario(inv);
    } else if (this.tablaForm.controls.NoBultos2.value != undefined) {
      let inv = {};
      inv['Variedad'] = this.proveedoresForm.controls.Variedad.value;
      inv['Cantidad'] = this.tablaForm.controls.NoBultos2.value;
      inv['Calidad'] = "2nda";
      this.proveedoresService.agregarInventario(inv);
    } else if (this.tablaForm.controls.NoBultos3.value != undefined) {
      let inv = {};
      inv['Variedad'] = this.proveedoresForm.controls.Variedad.value;
      inv['Cantidad'] = this.tablaForm.controls.NoBultos3.value;
      inv['Calidad'] = "3ra";
      this.proveedoresService.agregarInventario(inv);
    } else if (this.tablaForm.controls.NoBultos4.value != undefined) {
      let inv = {};
      inv['Variedad'] = this.proveedoresForm.controls.Variedad.value;
      inv['Cantidad'] = this.tablaForm.controls.NoBultos4.value;
      inv['Calidad'] = "4ta";
      this.proveedoresService.agregarInventario(inv);
    } else if (this.tablaForm.controls.NoBultosM.value != undefined) {
      let inv = {};
      inv['Variedad'] = this.proveedoresForm.controls.Variedad.value;
      inv['Cantidad'] = this.tablaForm.controls.NoBultosM.value;
      inv['Calidad'] = "4ta";
      this.proveedoresService.agregarInventario(inv);
    } else if (this.tablaForm.controls.NoBultosMono.value != undefined) {
      let inv = {};
      inv['Variedad'] = this.proveedoresForm.controls.Variedad.value;
      inv['Cantidad'] = this.tablaForm.controls.NoBultosMono.value;
      inv['Calidad'] = "4ta";
      this.proveedoresService.agregarInventario(inv);
    } else if (this.tablaForm.controls.NoBultosO.value != undefined) {
      let inv = {};
      inv['Variedad'] = this.proveedoresForm.controls.Variedad.value;
      inv['Cantidad'] = this.tablaForm.controls.NoBultosO.value;
      inv['Calidad'] = "4ta";
      this.proveedoresService.agregarInventario(inv);
    }
  }

  calcularKGArp(event) {
    this.kgsArp = this.proveedoresForm.controls.PesoRec.value / event.target.value;
  }

  calculoTabla(event) {
    console.log(event.target.value)
    this.kgsRecibido = this.kgsArp * event.target.value;
    this.DescMerma = this.proveedoresForm.controls.Merma.value;
    this.totalKgsDesc = event.target.value * this.DescMerma;
    this.totalKgsNeto = this.kgsRecibido - this.totalKgsDesc;
    this.totalGeneral = this.total + this.total2 + this.total3 + this.total4 + this.totalM + this.totalMono + this.totalO;
  }

  calculoTabla2(event) {
    this.kgsRecibido2 = this.kgsArp * event.target.value;
    this.DescMerma2 = this.proveedoresForm.controls.Merma.value;
    this.totalKgsDesc2 = event.target.value * this.DescMerma2;
    this.totalKgsNeto2 = this.kgsRecibido2 - this.totalKgsDesc2;
    this.totalGeneral = this.total + this.total2 + this.total3 + this.total4 + this.totalM + this.totalMono + this.totalO;
  }

  calculoTabla3(event) {
    this.kgsRecibido3 = this.kgsArp * event.target.value;
    this.DescMerma3 = this.proveedoresForm.controls.Merma.value;
    this.totalKgsDesc3 = event.target.value * this.DescMerma3;
    this.totalKgsNeto3 = this.kgsRecibido3 - this.totalKgsDesc3;
    this.totalGeneral = this.total + this.total2 + this.total3 + this.total4 + this.totalM + this.totalMono + this.totalO;
  }

  calculoTabla4(event) {
    this.kgsRecibido4 = this.kgsArp * event.target.value;
    this.DescMerma4 = this.proveedoresForm.controls.Merma.value;
    this.totalKgsDesc4 = event.target.value * this.DescMerma4;
    this.totalKgsNeto4 = this.kgsRecibido4 - this.totalKgsDesc4;
    this.totalGeneral = this.total + this.total2 + this.total3 + this.total4 + this.totalM + this.totalMono + this.totalO;
  }

  calculoTablaMixta(event) {
    this.kgsRecibidoM = this.kgsArp * event.target.value;
    this.DescMermaM = this.proveedoresForm.controls.Merma.value;
    this.totalKgsDescM = event.target.value * this.DescMermaM;
    this.totalKgsNetoM = this.kgsRecibidoM - this.totalKgsDescM;
    this.totalGeneral = this.total + this.total2 + this.total3 + this.total4 + this.totalM + this.totalMono + this.totalO;
  }

  calculoTablaMono(event) {
    this.kgsRecibidoMono = this.kgsArp * event.target.value;
    this.DescMermaMono = this.proveedoresForm.controls.Merma.value;
    this.totalKgsDescMono = event.target.value * this.DescMermaMono;
    this.totalKgsNetoMono = this.kgsRecibidoMono - this.totalKgsDescMono;
    this.totalGeneral = this.total + this.total2 + this.total3 + this.total4 + this.totalM + this.totalMono + this.totalO;
  }

  calculoTablaOtros(event) {
    this.kgsRecibidoO = this.kgsArp * event.target.value;
    this.DescMermaO = this.proveedoresForm.controls.Merma.value;
    this.totalKgsDescO = event.target.value * this.DescMermaO;
    this.totalKgsNetoO = this.kgsRecibidoO - this.totalKgsDescO;
    this.totalGeneral = this.total + this.total2 + this.total3 + this.total4 + this.totalM + this.totalMono + this.totalO;
  }

  getPrecio(event) {
    this.total = event.target.value * this.totalKgsNeto;
  }

  getPrecio2(event) {
    this.total2 = event.target.value * this.totalKgsNeto2;
  }

  getPrecio3(event) {
    this.total3 = event.target.value * this.totalKgsNeto3;
  }

  getPrecio4(event) {
    this.total4 = event.target.value * this.totalKgsNeto4;
  }

  getPrecioMixta(event) {
    this.totalM = event.target.value * this.totalKgsNetoM;
  }

  getPrecioMono(event) {
    this.totalMono = event.target.value * this.totalKgsNetoMono;
  }

  getPrecioOtro(event) {
    this.totalO = event.target.value * this.totalKgsNetoO;
  }

}
