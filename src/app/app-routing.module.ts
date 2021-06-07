import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'signin',
    loadChildren: () => import('./signin/signin.module').then( m => m.SigninPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then( m => m.MainPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'matchprofile',
    loadChildren: () => import('./matchprofile/matchprofile.module').then( m => m.MatchprofilePageModule)
  },  {
    path: 'searchresult',
    loadChildren: () => import('./searchresult/searchresult.module').then( m => m.SearchresultPageModule)
  },
  {
    path: 'chatwindow',
    loadChildren: () => import('./chatwindow/chatwindow.module').then( m => m.ChatwindowPageModule)
  },
  {
    path: 'imgupload',
    loadChildren: () => import('./imgupload/imgupload.module').then( m => m.ImguploadPageModule)
  },
  {
    path: 'interestedprofile',
    loadChildren: () => import('./interestedprofile/interestedprofile.module').then( m => m.InterestedprofilePageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
