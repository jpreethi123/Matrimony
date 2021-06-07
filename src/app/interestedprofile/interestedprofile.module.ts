import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InterestedprofilePageRoutingModule } from './interestedprofile-routing.module';

import { InterestedprofilePage } from './interestedprofile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InterestedprofilePageRoutingModule
  ],
  declarations: [InterestedprofilePage]
})
export class InterestedprofilePageModule {}
