import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public firestore: AngularFirestore) { }

  inicioSesion(usuario){
    return this.firestore.collection('Usuarios', ref => ref.where('Usuario', '==', usuario.Usuario).where('Contraseña', '==', usuario.Contrasenia)).snapshotChanges();
  }
}
