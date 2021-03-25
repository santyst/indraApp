import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

// Components
import { ContainerModule } from '@components/container/container.module';

import { ConfirmDataPageRoutingModule } from './confirm-data-routing.module';

import { ConfirmDataPage } from './confirm-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContainerModule,
    ConfirmDataPageRoutingModule,
  ],
  declarations: [ConfirmDataPage],
})
export class ConfirmDataPageModule {}
