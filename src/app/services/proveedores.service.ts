import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Inventario } from '../models/inventario';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
  cont: number;
  inventario: Inventario = new Inventario();

  constructor(public firestore: AngularFirestore) { }

  getProveedores(){
    return this.firestore.collection('Proveedores').snapshotChanges();
  }

  restarInventario(inv){
    this.cont = 0;
    let variedad = inv['Variedad'] + " " + inv['Calidad'];
    console.log(variedad)
    let doc = this.firestore.collection('Inventario', ref => ref.where('Variedad', '==', variedad));
    doc.snapshotChanges().subscribe(data => {
      if (data) {
        let cantidad = data[0].payload.doc.data()['Cantidad'];
        this.inventario.Cantidad = cantidad;
        console.log(cantidad)
      }
      
      this.inventario.Cantidad = this.inventario.Cantidad + inv['Cantidad'];
      console.log(this.inventario.Cantidad)
      this.cont++;
      if(this.cont == 1){
        this.firestore.doc('Inventario/' + variedad).update({ 'Cantidad': this.inventario.Cantidad });
      }
    });
  }
}
