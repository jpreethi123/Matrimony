import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatwindowPageRoutingModule } from './chatwindow-routing.module';

import { ChatwindowPage } from './chatwindow.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatwindowPageRoutingModule
  ],
  declarations: [ChatwindowPage]
})
export class ChatwindowPageModule {}
