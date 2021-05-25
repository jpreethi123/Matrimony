/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { SigninPage } from '../signin/signin.page';
import { SignupPage } from '../signup/signup.page';
import { ChatserviceService } from './../chatservice.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  name='';
  userid='';
  uid='';
  signup=SigninPage.siginUid;
  signin=SignupPage.signUpUid;

  constructor(private alertCtrl: AlertController,private router: Router,private authService: AuthService,private chatService: ChatserviceService) { }

  ngOnInit() {
    if(this.signin===''){
      this.uid = this.signup;
    }
    else{
      this.uid = this.signin;
    }
    this.authService.getBasicDetails(this.uid).subscribe((msg)=>{
          this.name = msg[0][0].name;
          this.userid = (msg[0][0].uid);
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
              this.chatService.signOut().then(() => {
                this.router.navigate(['signin']);
              });
          }
        }
      ]
    });
    (await alert).present();
  }

}
