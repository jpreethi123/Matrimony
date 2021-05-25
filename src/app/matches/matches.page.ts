/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/naming-convention */
import { NotificationsPage } from './../notifications/notifications.page';
import { SignupPage } from './../signup/signup.page';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { SigninPage } from './../signin/signin.page';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.page.html',
  styleUrls: ['./matches.page.scss'],
})
export class MatchesPage implements OnInit {
  static viewvalue=0;
  //uid=SigninPage.siginUid;
  signup=SigninPage.siginUid;
  signin=SignupPage.signUpUid;
  uid='';

  height_to_num = {};

  static matchUid='';
  static gender;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  AllMatches=[];
  static allMatch = [];
  comparemale=[{id:1,name:'male'},{id:2,name:'Male'}];

  constructor(private authService: AuthService,public router: Router) { }

  ngOnInit() {
    if(this.signin===''){
      this.uid = this.signup;
    }
    else{
      this.uid = this.signin;
    }
    const d=new Date();

    console.log('date',d.getFullYear());

    this.authService.getheightrange().subscribe((msg)=>{
      for(let i=1;i<msg[0].length+1;i++){
        this.height_to_num[msg[0][i-1].height] = msg[0][i-1].height_in_num;
      }
    });

    this.authService.getBasicDetails(this.uid).subscribe((msg)=>{
      MatchesPage.gender=msg[0][0].gender;
      console.log(MatchesPage.gender);
      if(MatchesPage.gender === 'male' || MatchesPage.gender === 'Male')
      {
        this.authService.fetchAllFemale().subscribe((user)=>{
          console.log('user',user);

          // eslint-disable-next-line @typescript-eslint/prefer-for-of
          for(let i=0;i<user[0].length;i++)
          {
            const date=user[0][i].dob.substring(0,4);
            // eslint-disable-next-line radix
            const num=parseInt(date);
            console.log('age is',d.getFullYear()-num);
            user[0][i].age=d.getFullYear()-num;
            user[0][i].flag=0;
            user[0][i].like=0;
            user[0][i].chatreq=0;
            user[0][i].height = Object.keys(this.height_to_num).find(key => this.height_to_num[key] === user[0][i].height);
            console.log('each user',user[0][i]);
            this.AllMatches.push(user[0][i]);
            console.log('female matches',this.AllMatches);
            this.authService.onerequest(this.uid).subscribe((msg1)=>{

              // eslint-disable-next-line @typescript-eslint/prefer-for-of
              for(let j=0;j<msg1[0].length;j++)
              {
                // eslint-disable-next-line @typescript-eslint/prefer-for-of
                for(let p=0;p<this.AllMatches.length;p++)
                {
                  console.log('true');
                  console.log(this.AllMatches[p].uid,msg1[0][j].send_to);
                  if(this.AllMatches[p].uid === msg1[0][j].send_to)
                  {
                    console.log('true');
                    this.AllMatches[p].flag=1;
                  }
                }
              }

            });

            this.authService.onelike(this.uid).subscribe((msg2)=>{
              // eslint-disable-next-line @typescript-eslint/prefer-for-of
              for(let j=0;j<msg2[0].length;j++)
              {
                // eslint-disable-next-line @typescript-eslint/prefer-for-of
                for(let p=0;p<this.AllMatches.length;p++)
                {
                  if(this.AllMatches[p].uid === msg2[0][j].send_to)
                  {
                    this.AllMatches[p].like=1;
                  }
                }
              }

            });

            this.authService.getchatrequest(this.uid).subscribe((msg3) => {
              for(let j=0;j<msg3[0].length;j++)
              {
                for(let p=0;p<this.AllMatches.length;p++)
                {
                  if((this.AllMatches[p].uid === msg3[0][j].send_to || this.AllMatches[p].uid === msg3[0][j].send_from)  && msg3[0][j].status === 'accepted')
                  {
                    this.AllMatches[p].chatreq=2;
                  }
                  if((this.AllMatches[p].uid === msg3[0][j].send_to || this.AllMatches[p].uid === msg3[0][j].send_from) && msg3[0][j].status === 'pending')
                  {
                    this.AllMatches[p].chatreq=1;
                  }
                }
              }
            });

          }

        });
      }
      else if(MatchesPage.gender === 'Female' || MatchesPage.gender === 'female')
      {
        this.authService.fetchAllMale().subscribe((user)=>{
          console.log(user);
          //this.AllMatches=user[0];
          // eslint-disable-next-line @typescript-eslint/prefer-for-of
          for(let i=0;i<user[0].length;i++)
          {
            const date=user[0][i].dob.substring(0,4);
            // eslint-disable-next-line radix
            const num=parseInt(date);
           // console.log('age is',d.getFullYear()-num);
            user[0][i].age=d.getFullYear()-num;
            user[0][i].flag=0;
            user[0][i].like=0;
            user[0][i].chatreq=0;
            user[0][i].height = Object.keys(this.height_to_num).find(key => this.height_to_num[key] === user[0][i].height);
            this.AllMatches.push(user[0][i]);
            this.authService.onerequest(this.uid).subscribe((msg1)=>{
              console.log('one request',msg1);

              // eslint-disable-next-line @typescript-eslint/prefer-for-of
              for(let j=0;j<msg1[0].length;j++)
              {
                // eslint-disable-next-line @typescript-eslint/prefer-for-of
                for(let p=0;p<this.AllMatches.length;p++)
                {
                  console.log('true');
                  console.log(this.AllMatches[p].uid,msg1[0][j].send_to);
                  if(this.AllMatches[p].uid === msg1[0][j].send_to)
                  {
                    console.log('true');
                    this.AllMatches[p].flag=1;
                  }
                }
              }

            });

            this.authService.onelike(this.uid).subscribe((msg2)=>{
              for(let j=0;j<msg2[0].length;j++)
              {
                for(let p=0;p<this.AllMatches.length;p++)
                {
                  if(this.AllMatches[p].uid === msg2[0][j].send_to)
                  {
                    this.AllMatches[p].like=1;
                  }
                }
              }

            });

            this.authService.getchatrequest(this.uid).subscribe((msg3) => {
              for(let j=0;j<msg3[0].length;j++)
              {
                for(let p=0;p<this.AllMatches.length;p++)
                {
                  if((this.AllMatches[p].uid === msg3[0][j].send_to || this.AllMatches[p].uid === msg3[0][j].send_from) && msg3[0][j].status === 'accepted')
                  {
                    this.AllMatches[p].chatreq=2;
                  }
                  if((this.AllMatches[p].uid === msg3[0][j].send_to || this.AllMatches[p].uid === msg3[0][j].send_from) && msg3[0][j].status === 'pending')
                  {
                    this.AllMatches[p].chatreq=1;
                  }
                }
              }
            });


          }


        });
      }



    });

  MatchesPage.allMatch = this.AllMatches;
  console.log('All ',MatchesPage.allMatch);


  }

  view(uid){
    NotificationsPage.profileuid='';
    MatchesPage.viewvalue=1;
    MatchesPage.matchUid=uid;
    console.log(MatchesPage.matchUid);
    this.router.navigate(['matchprofile']);
  }


  changeicon(uidreq)
  {
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for(let i=0;i<this.AllMatches.length;i++)
    {
      if(this.AllMatches[i].uid===uidreq)
      {
        this.AllMatches[i].like=1;
        break;
      }
    }


    this.authService.onelike(this.uid).subscribe((msg)=>{
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for(let j=0;j<msg[0].length;j++)
      {
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for(let p=0;p<this.AllMatches.length;p++)
        {
          if(this.AllMatches[p].uid === msg[0][j].send_to)
          {
            this.AllMatches[p].like=1;
          }
        }
      }

    });


    const reqe={
      from:this.uid,
      to:uidreq
    };
    this.authService.savelikes(reqe).subscribe((msg)=>{
      console.log(msg);
    });

  }

  chatrequest(uidreq){
    for(let i=0;i<this.AllMatches.length;i++)
      {
        if(this.AllMatches[i].uid===uidreq)
        {
          this.AllMatches[i].chatreq=1;
          break;
        }
      }

    const req={
      from:this.uid,
      to:uidreq,
      status:'pending'
    };
    this.authService.chatrequests(req).subscribe((msg)=>{
      console.log(msg);
    });

  }

  interest(uidreq)
  {
    console.log('matches length',this.AllMatches.length);

      for(let i=0;i<this.AllMatches.length;i++)
      {
        if(this.AllMatches[i].uid===uidreq)
        {
          this.AllMatches[i].flag=1;
          break;
        }
      }

      this.authService.onerequest(this.uid).subscribe((msg)=>{
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for(let j=0;j<msg[0].length;j++)
        {
          // eslint-disable-next-line @typescript-eslint/prefer-for-of
          for(let p=0;p<this.AllMatches.length;p++)
          {
            if(this.AllMatches[p].uid === msg[0][j].send_to)
            {
              this.AllMatches[p].flag=1;
            }
          }
        }

      });



    console.log(this.uid);
    console.log(uidreq);
    const req={
      from:this.uid,
      to:uidreq
    };
    this.authService.requests(req).subscribe((msg)=>{
      console.log(msg);
    });
  }


}
