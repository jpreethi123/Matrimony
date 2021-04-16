import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children:[
      {
        path: 'matches',
        loadChildren: () => import('./../matches/matches.module').then( m => m.MatchesPageModule)
      },
      {
        path: 'chat',
        loadChildren: () => import('./../chat/chat.module').then( m => m.ChatPageModule)
      },
      {
        path: 'search',
        loadChildren: () => import('./../search/search.module').then( m => m.SearchPageModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./../notifications/notifications.module').then( m => m.NotificationsPageModule)
      },
      {
        path: '',
        redirectTo: 'matches',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
