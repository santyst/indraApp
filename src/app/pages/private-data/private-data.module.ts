// Libs
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

// Components
import { ContainerModule } from '@components/container/container.module';

import { PrivateDataPageRoutingModule } from './private-data-routing.module';

import { PrivateDataPage } from './private-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ContainerModule,
    PrivateDataPageRoutingModule
  ],
  declarations: [PrivateDataPage]
})
export class PrivateDataPageModule {}
