import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  constructor(public firestore: AngularFirestore) { }

  getProveedores(){
    return this.firestore.collection('Proveedores').snapshotChanges();
  }
}
