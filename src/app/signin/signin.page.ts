import { ErrorHandlerService } from './../services/error-handler.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthService } from './../services/auth.service';



@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  public submit: FormGroup;
  public submitAttempt = false;

  constructor(private router: Router,public loadingController: LoadingController,public formBuilder: FormBuilder,
    public alertCtrl: AlertController,private authService: AuthService,private errorHandlerService: ErrorHandlerService) {
    this.submit=this.formBuilder.group({
      email:['', Validators.compose([Validators.minLength(10), Validators.pattern('^[a-z0-9_.+-]+@[a-z0-9-]+.[a-z]+$'),
      Validators.required])],
      password:['', Validators.compose([Validators.minLength(8), Validators.pattern('[a-zA-Z0-9@$_]*'), Validators.required])]


    });
  }

  ngOnInit() {
  }

  async signin(){
    if(this.submit.valid){
    // const loading = await this.loadingController.create({
    //   duration: 500,
    //   message: 'Please wait...',
    //   translucent: true,
    //   cssClass: 'custom-class custom-loading'
    // });
    this.login();
    // return (await loading).present();
  }
  else{
    const alert=await this.alertCtrl.create({
      message:'Please enter all details correctly',
      buttons:['OK']
    });
    await alert.present();
  }

  }
async login(): Promise<void>{
  const mail=this.submit.get('email').value;
  const password=this.submit.get('password').value;
  console.log(mail+' '+password);
  this.authService.login(mail,password).subscribe(async (msg)=>{
    if(msg)
    {
    console.log(msg);
    }
    else
    {
      const alert=await this.alertCtrl.create({
        message:'Your Email/Password are wrong.',
        buttons:['OK']
      });
      await alert.present();

    }
  });

}

}
