import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  constructor(private router: Router,public loadingController: LoadingController) {}

  ngOnInit() {
  }

  async signin(){
    const loading = await this.loadingController.create({
      duration: 500,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    this.router.navigate(['main']);
    return (await loading).present();

  }

}
