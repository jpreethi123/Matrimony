/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { NotificationsPage } from './../notifications/notifications.page';
import { SignupPage } from './../signup/signup.page';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { SigninPage } from './../signin/signin.page';
import { Component, OnInit } from '@angular/core';
import { SearchPage } from './../search/search.page';

@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.page.html',
  styleUrls: ['./searchresult.page.scss'],
})
export class SearchresultPage implements OnInit {
  static viewvalue=0;
  signup=SigninPage.siginUid;
  signin=SignupPage.signUpUid;
  uid='';
  AllMatches = [];
  SearchResult = SearchPage.Result;

  static matchUid='';
  no = '';

  constructor(private authService: AuthService,public router: Router) { }

  ngOnInit() {
    if(this.signin===''){
      this.uid = this.signup;
    }
    else{
      this.uid = this.signin;
    }

    const d=new Date();

    //console.log('date',d.getFullYear());

    this.authService.getBasicDetails(this.uid).subscribe((msg)=>{
      if(this.SearchResult.length === 0){
        this.no = 'No user found';
      }
      else{
      this.AllMatches = [];
      for(let k = 0;k<this.SearchResult.length;k++){
        this.authService.fetchSearchResult(this.SearchResult[k]).subscribe((user) => {
              console.log(user);
              for(let i=0;i<user[0].length;i++)
              {
                const date=user[0][i].dob.substring(0,4);
                // eslint-disable-next-line radix
                const num=parseInt(date);
                console.log('age is',d.getFullYear()-num);
                user[0][i].age=d.getFullYear()-num;
                user[0][i].flag=0;
                user[0][i].like=0;
                console.log('each user',user[0][i]);
                this.AllMatches.push(user[0][i]);

                this.authService.onerequest(this.uid).subscribe((msg1)=>{
                  for(let j=0;j<msg1[0].length;j++)
                  {
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
              }
            });
      }
    }

    });

  }

  view(uid){
    NotificationsPage.profileuid='';
    SearchresultPage.viewvalue=1;
    SearchresultPage.matchUid=uid;
    console.log(SearchresultPage.matchUid);
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


}



