import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;

  constructor(public firestore: AngularFirestore) { }

  inicioSesion(usuario){
    this.user = usuario.Usuario;
    return this.firestore.collection('Usuarios', ref => ref.where('Usuario', '==', usuario.Usuario).where('Contraseña', '==', usuario.Contrasenia)).snapshotChanges();
  }
}
