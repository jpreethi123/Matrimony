import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MatchprofilePage } from './matchprofile.page';

const routes: Routes = [
  {
    path: '',
    component: MatchprofilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatchprofilePageRoutingModule {}
