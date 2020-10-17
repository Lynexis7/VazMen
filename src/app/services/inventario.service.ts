import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  constructor(private firestore: AngularFirestore) { }

  getInventario(){
    return this.firestore.collection('Inventario').snapshotChanges();
  }

  agregarProducto(prod){
    this.firestore.doc('Inventario/' + prod.Variedad).set({
      Variedad: prod.Variedad,
      Cantidad: prod.Cantidad
    });
  }
}
