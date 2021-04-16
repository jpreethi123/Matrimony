import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  constructor(private alertCtrl: AlertController,private router: Router) { }

  ngOnInit() {
  }

  async presentConfirm() {
    const alert = this.alertCtrl.create({
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.router.navigate(['main']);
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.router.navigate(['signin']);
          }
        }
      ]
    });
    (await alert).present();
  }

}
