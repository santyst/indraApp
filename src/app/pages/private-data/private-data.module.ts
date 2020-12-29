import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrivateDataPageRoutingModule } from './private-data-routing.module';

import { PrivateDataPage } from './private-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PrivateDataPageRoutingModule
  ],
  declarations: [PrivateDataPage]
})
export class PrivateDataPageModule {}
