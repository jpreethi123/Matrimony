import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MatchprofilePageRoutingModule } from './matchprofile-routing.module';

import { MatchprofilePage } from './matchprofile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatchprofilePageRoutingModule
  ],
  declarations: [MatchprofilePage]
})
export class MatchprofilePageModule {}
