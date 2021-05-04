import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { SigninPage } from '../signin/signin.page';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  uid=SigninPage.siginUid;
  name='';
  userid='';

  constructor(private alertCtrl: AlertController,private router: Router,private authService: AuthService) { }

  ngOnInit() {
    this.authService.getBasicDetails(this.uid).subscribe((msg)=>{
          this.name = msg[0][0].name;
          const a = msg[0][0].uid.slice(msg[0][0].uid.length-4);
          const b = msg[0][0].dob.slice(0,4);
          this.userid = (a+b);
    });
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
