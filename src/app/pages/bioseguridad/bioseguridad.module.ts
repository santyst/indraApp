import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BioseguridadPageRoutingModule } from './bioseguridad-routing.module';

import { BioseguridadPage } from './bioseguridad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    BioseguridadPageRoutingModule
  ],
  declarations: [BioseguridadPage]
})
export class BioseguridadPageModule {}
