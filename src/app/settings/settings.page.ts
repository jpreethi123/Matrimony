/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { SigninPage } from '../signin/signin.page';
import { SignupPage } from '../signup/signup.page';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  signup=SigninPage.siginUid;
  signin=SignupPage.signUpUid;
  id='';
  hidevalue;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  checked=false;

  constructor(public router: Router,public alertCtrl: AlertController,private authService: AuthService) { }

  ngOnInit() {
    if(this.signin===''){
      this.id = this.signup;
    }
    else{
      this.id = this.signin;
    }
    this.authService.showhiding(this.id).subscribe((msg)=>{
      console.log(msg[0]);
      if(msg[0][0].hide===1)
      {
        this.checked=true;
      }

    });
  }
  async deleteaccount()
  {
    const alert = this.alertCtrl.create({
      message: 'Are you sure you want to Delete account?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.router.navigate(['settings']);
          }
        },
        {
          text: 'Yes',
          handler: () => {
            //console.log('setting');
            this.authService.deleteaccount(this.id).subscribe((msg)=>{
              console.log(msg);
            });
            this.router.navigate(['home']);
          }
        }
      ]
    });
    (await alert).present();
  }

  knowhiding()
  {

    console.log(this.checked);
    this.checked=!this.checked;
    if(this.checked===true)
    {
      this.hidevalue=1;
    }
    else
    {
      this.hidevalue=0;
    }
    const userval={
      uid:this.id,
      hide:this.hidevalue
    };
    console.log(userval);
    this.authService.updatehidephone(userval).subscribe((msg)=>{
      console.log(msg);
    });

  }


}
