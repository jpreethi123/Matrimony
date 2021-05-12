import { MatchesPage } from './../matches/matches.page';
import { Router } from '@angular/router';
import { SignupPage } from './../signup/signup.page';
import { SigninPage } from './../signin/signin.page';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  static profileuid='';
  static viewnoti=0;
  signup=SigninPage.siginUid;
  signin=SignupPage.signUpUid;
  uid;
  requests=[];
  likes=[];


  constructor(private authService: AuthService,public router: Router) {

   }

  ngOnInit() {
    if(this.signin===''){
      this.uid = this.signup;
    }
    else{
      this.uid = this.signin;
    }
    this.authService.showrequests(this.uid).subscribe((msg)=>{
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for(let i=0;i<msg[0].length;i++)
      {
        const req=msg[0][i].send_from;
        this.authService.getBasicDetails(req).subscribe((msg1)=>{
          this.requests.push({id:req,name:msg1[0][0].name});
        });

      }
    });
    this.authService.fetchlikes(this.uid).subscribe((msg)=>{
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for(let i=0;i<msg[0].length;i++)
      {
        const req=msg[0][i].send_from;
        this.authService.getBasicDetails(req).subscribe((msg1)=>{
          this.likes.push({id:req,name:msg1[0][0].name});
        });

      }
    });

  }
  show(id){
    MatchesPage.matchUid='';
    console.log(id);
    NotificationsPage.viewnoti=1;
    NotificationsPage.profileuid=id;
    this.router.navigate(['matchprofile']);
  }

}
