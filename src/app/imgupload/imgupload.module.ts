import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImguploadPageRoutingModule } from './imgupload-routing.module';

import { ImguploadPage } from './imgupload.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImguploadPageRoutingModule
  ],
  declarations: [ImguploadPage]
})
export class ImguploadPageModule {}
