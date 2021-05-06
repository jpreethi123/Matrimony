import { MatchesPage } from './../matches/matches.page';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-matchprofile',
  templateUrl: './matchprofile.page.html',
  styleUrls: ['./matchprofile.page.scss'],
})
export class MatchprofilePage implements OnInit {
  matchuid=MatchesPage.matchUid;
  showpersonal=1;
  showfamily=0;
  showedu=0;
  showpreference=0;
  filledpreference=1;
  filledfamily=1;


  constructor() { }

  ngOnInit() {
  }
  personal(){
    this.showfamily=0;
    this.showpersonal=1;
    this.showedu=0;
    this.showpreference=0;
  }
  family(){
    this.showfamily=1;
    this.showpersonal=0;
    this.showedu=0;
    this.showpreference=0;

  }
  education(){
    this.showfamily=0;
    this.showpersonal=0;
    this.showedu=1;
    this.showpreference=0;
  }
  preference(){
    this.showfamily=0;
    this.showpersonal=0;
    this.showedu=0;
    this.showpreference=1;

  }

}
