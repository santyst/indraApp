import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ContainerComponent } from '@components/container/container.component';

@NgModule({
imports: [
  CommonModule,
  IonicModule
],
declarations: [
  ContainerComponent,
],
exports: [
  ContainerComponent,
]
})

export class ContainerModule { }
