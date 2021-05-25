/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/prefer-for-of */
import { Component, OnInit } from '@angular/core';
import { MatchesPage } from './../matches/matches.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  chatList = [];
  static obj = {};

  constructor(private router: Router) { }
//chatreq,mail,name,uid
  ngOnInit() {
    for(let i=0;i<MatchesPage.allMatch.length;i++){
       if(MatchesPage.allMatch[i].chatreq === 2){
         this.chatList.push({email:MatchesPage.allMatch[i].mail,name:MatchesPage.allMatch[i].name});
       }
    }
  }

  chats(mail,name1){
    ChatPage.obj = {
      email: mail,
      name: name1,
    };
    this.router.navigate(['/chatwindow']);
  }

}
