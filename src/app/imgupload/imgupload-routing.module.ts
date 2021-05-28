import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImguploadPage } from './imgupload.page';

const routes: Routes = [
  {
    path: '',
    component: ImguploadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImguploadPageRoutingModule {}
