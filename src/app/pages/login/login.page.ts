import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    public router: Router,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    public authService: AuthService
  ) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.required],
      password: [
        '',
        Validators.compose([Validators.minLength(6), Validators.required])
      ]
    });
  }

  ngOnInit() {}

  async userLogin(loginForm: FormGroup): Promise<void> {
    if (!loginForm.valid) {
      console.log(loginForm.value);
    } else {
      const loading = await this.loadingCtrl.create();
      loading.present();
      this.authService
        .userLogin(loginForm.value.email, loginForm.value.password)
        .then(
          authService => {
            loading.dismiss().then(() => {
              this.router.navigateByUrl('/home');
            });
          },
          error => {
            loading.dismiss().then(async () => {
              const alert = await this.alertCtrl.create({
                message: error.message,
                buttons: [{ text: 'Ok', role: 'cancel' }]
              });
              alert.present();
            });
          }
        );
    }
  }
}
