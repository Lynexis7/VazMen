import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GastosService {

  constructor(public firestore: AngularFirestore) { }

  insertarGasto(gasto){
    this.firestore.collection('Gastos').add(gasto);
  }

  obtenerGastos(){
    return this.firestore.collection('Gastos').snapshotChanges();
  }
}
