import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { SigninPage } from '../signin/signin.page';
import { SignupPage } from '../signup/signup.page';
import { NotificationsPage } from '../notifications/notifications.page';
import { MatchesPage } from '../matches/matches.page';



@Component({
  selector: 'app-interestedprofile',
  templateUrl: './interestedprofile.page.html',
  styleUrls: ['./interestedprofile.page.scss'],
})
export class InterestedprofilePage implements OnInit {
  signup=SigninPage.siginUid;
  signin=SignupPage.signUpUid;
  uid='';
   // eslint-disable-next-line @typescript-eslint/naming-convention
   AllMatches=[];
   // eslint-disable-next-line @typescript-eslint/naming-convention
   height_to_num = {};

  constructor(private authService: AuthService ,public router: Router) { }

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
    this.authService.displayinterests(this.uid).subscribe((msg)=>{
      console.log(msg[0]);
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for(let i=0;i<msg[0].length;i++)
      {
        this.authService.getBasicDetails(msg[0][i].send_to).subscribe((user)=>{
          if(user[0].length>0)
          {
          //console.log(user[0]);
          //console.log('detailsssssssss',user[0][0].name);
          const date=user[0][0].dob.substring(0,4);
          // eslint-disable-next-line radix
          const num=parseInt(date);
          console.log('age is',d.getFullYear()-num);
          user[0][0].age=d.getFullYear()-num;
          user[0][0].flag=0;
          user[0][0].like=0;
          user[0][0].chatreq=0;
         // user[0][0].height = Object.keys(this.height_to_num).find(key => this.height_to_num[key] === user[0][0].height);
          console.log('each user',user[0][0]);
          this.authService.getPersonalDetails(msg[0][i].send_to).subscribe((user1)=>{
            user[0][0].height=Object.keys(this.height_to_num).find(key => this.height_to_num[key] === user1[0][0].height);
            user[0][0].caste=user1[0][0].caste;
          });
          this.authService.getEduDetails(msg[0][i].send_to).subscribe((user2)=>{
            user[0][0].occupation=user2[0][0].occupation;
          });
          this.AllMatches.push(user[0][0]);
          // this.authService.getSetProfileId(user[0][0].uid).subscribe((msgs)=>{
          //   console.log('idmsg',msgs);

          //       if(msgs['id'] !== null ){
          //         this.authService.getProfilePhoto(user[0][0].uid,msgs['id']).subscribe((msg1)=>{
          //             user[0][0].displayImage = 'data:image/jpeg;base64,' + msg1.body['message'];
          //         });
          //       }
          //       else {
          //         user[0][0].displayImage = './../../assets/icon/profile.png';
          //       }

          // });

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
            // eslint-disable-next-line @typescript-eslint/prefer-for-of
            for(let j=0;j<msg3[0].length;j++)
            {
              // eslint-disable-next-line @typescript-eslint/prefer-for-of
              for(let p=0;p<this.AllMatches.length;p++)
              {
                if((this.AllMatches[p].uid === msg3[0][j].send_to || this.AllMatches[p].uid === msg3[0][j].send_from)
                && msg3[0][j].status === 'accepted')
                {
                  this.AllMatches[p].chatreq=2;
                }
                if((this.AllMatches[p].uid === msg3[0][j].send_to || this.AllMatches[p].uid === msg3[0][j].send_from)
                && msg3[0][j].status === 'pending')
                {
                  this.AllMatches[p].chatreq=1;
                }
              }
            }
          });
          console.log('all matches',this.AllMatches);



          }
        });

      }
    });



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
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
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

      // eslint-disable-next-line @typescript-eslint/prefer-for-of
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
  view1()
  {
    console.log('check profile');
  }



  dislike(uidreq)
  {
    console.log(uidreq);
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for(let i=0;i<this.AllMatches.length;i++)
    {
      if(this.AllMatches[i].uid===uidreq)
      {
        this.AllMatches[i].like=0;
        break;
      }
    }

    this.authService.dislike(this.uid,uidreq).subscribe((msg)=>{
      console.log(msg);
    });
  }

  unsendinterest(uidreq)
  {
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for(let i=0;i<this.AllMatches.length;i++)
    {
      if(this.AllMatches[i].uid===uidreq)
      {
        this.AllMatches[i].flag=0;
        break;
      }
    }

    this.authService.unsendinterest(this.uid,uidreq).subscribe((msg)=>{
      console.log(msg);
    });


  }


}
