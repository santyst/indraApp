import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

// Components
import { ContainerComponent } from '@components/container/container.component';

import { ConfirmDataPageRoutingModule } from './confirm-data-routing.module';

import { ConfirmDataPage } from './confirm-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmDataPageRoutingModule
  ],
  declarations: [ConfirmDataPage, ContainerComponent]
})
export class ConfirmDataPageModule {}
