import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatwindowPage } from './chatwindow.page';

const routes: Routes = [
  {
    path: '',
    component: ChatwindowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatwindowPageRoutingModule {}
