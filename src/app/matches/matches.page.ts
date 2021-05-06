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
  uid=SigninPage.siginUid;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  static matchUid;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  static gender;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  AllMatches=[];
  comparemale=[{id:1,name:'male'},{id:2,name:'Male'}];

  constructor(private authService: AuthService,public router: Router) { }

  ngOnInit() {
    const d=new Date();

    console.log('date',d.getFullYear());

    this.authService.getBasicDetails(this.uid).subscribe((msg)=>{
      MatchesPage.gender=msg[0][0].gender;
      console.log(MatchesPage.gender);
      if(MatchesPage.gender === 'male' || MatchesPage.gender === 'Male')
      {
        this.authService.fetchAllFemale().subscribe((user)=>{

          //this.AllMatches=user[0];
          // eslint-disable-next-line @typescript-eslint/prefer-for-of
          for(let i=0;i<user[0].length;i++)
          {
            const date=user[0][i].dob.substring(0,4);
            // eslint-disable-next-line radix
            const num=parseInt(date);
            console.log('age is',d.getFullYear()-num);
            user[0][i].age=d.getFullYear()-num;
            this.AllMatches.push(user[0][i]);
          }
          console.log(this.AllMatches);

        });
      }
      else if(MatchesPage.gender === 'Female' || MatchesPage.gender === 'female')
      {
        this.authService.fetchAllMale().subscribe((user)=>{
          //this.AllMatches=user[0];
          // eslint-disable-next-line @typescript-eslint/prefer-for-of
          for(let i=0;i<user[0].length;i++)
          {
            const date=user[0][i].dob.substring(0,4);
            // eslint-disable-next-line radix
            const num=parseInt(date);
            console.log('age is',d.getFullYear()-num);
            user[0][i].age=d.getFullYear()-num;
            this.AllMatches.push(user[0][i]);
          }
          console.log(this.AllMatches);
        });
      }
      console.log(this.AllMatches);

    });

  }
  view(uid){
    MatchesPage.matchUid=uid;
    console.log(MatchesPage.matchUid);
    this.router.navigate(['matchprofile']);
  }


}
