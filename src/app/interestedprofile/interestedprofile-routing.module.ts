import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InterestedprofilePage } from './interestedprofile.page';

const routes: Routes = [
  {
    path: '',
    component: InterestedprofilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InterestedprofilePageRoutingModule {}
