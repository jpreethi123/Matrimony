import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadModalPageRoutingModule } from './upload-modal-routing.module';

import { UploadModalPage } from './upload-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploadModalPageRoutingModule
  ],
  declarations: [UploadModalPage]
})
export class UploadModalPageModule {}
