/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { ChatserviceService } from './../chatservice.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ChatPage } from './../chat/chat.page';
import { SigninPage } from './../signin/signin.page';

@Component({
  selector: 'app-chatwindow',
  templateUrl: './chatwindow.page.html',
  styleUrls: ['./chatwindow.page.scss'],
})
export class ChatwindowPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;

  messages: Observable<any[]>;
  newMsg = '';
  name1 = ChatPage.obj['name'];

  constructor(private chatService: ChatserviceService, private router: Router) {

  }

  ngOnInit() {
    this.messages = this.chatService.getChatMessages(ChatPage.obj['email'],SigninPage.email);
  }

  sendMessage() {
    if(this.newMsg !== ''){
      this.chatService.addChatMessage(this.newMsg,ChatPage.obj['email']).then((msg) => {
        this.newMsg = '';
        this.content.scrollToBottom();
      });
    }
  }


}
