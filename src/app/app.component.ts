import { Component, OnInit } from '@angular/core';
import { Login } from './models/login';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { AuthService } from './services/auth.service';
import { VirtualTimeScheduler } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'VazMen';
  loggeado: boolean = false;
  log: boolean;
  login: Login = new Login();
  user: any;
  progress: boolean;

  constructor(private noti: NotificationsService, private router: Router, private auth: AuthService) { }

  ngOnInit() {
    this.log = true;
  }

  onSubmit(loginForm: NgForm) {
    if (loginForm.value.Usuario == undefined || loginForm.value.Contrasenia == undefined) {
      this.noti.error('¡Error!', 'Hubo un error en la autenticación, intente de nuevo',
        { position: ['bottom', 'right'], timeOut: 5000, animate: 'fade', showProgressBar: true });
      loginForm.reset();
      this.progress = false;
    } else {
      this.login.Usuario = loginForm.value.Usuario;
      this.login.Contrasenia = loginForm.value.Contrasenia;
      try {
        this.auth.inicioSesion(this.login).subscribe(data => {
          if (data[0] == undefined) {
            setTimeout(() => {
              loginForm.reset();
              this.noti.error('¡Error!', 'El usuario no existe, intente de nuevo.',
                { position: ['bottom', 'right'], timeOut: 5000, animate: 'fade', showProgressBar: true });
              this.progress = false;
            }, 1000);
            this.progress = true;
          } else {
            setTimeout(() => {
              this.loggeado = true;
              this.log = false;
              this.router.navigate(['/home']);
              this.noti.success('¡Bienvenido, ' + this.login.Usuario + '!', '',
                { position: ['bottom', 'right'], timeOut: 5000, animate: 'fade', showProgressBar: true });
            }, 1500);

          }
        })
      } catch (error) {
        setTimeout(() => {
          this.noti.error('¡Error!', error,
            { position: ['bottom', 'right'], timeOut: 5000, animate: 'fade', showProgressBar: true });
          this.progress = false;
        }, 1000);
        this.progress = true;
      }
    }
  }

  progressBar() {
    this.progress = true;
  }
}
