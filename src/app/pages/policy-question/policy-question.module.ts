import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PolicyQuestionPageRoutingModule } from './policy-question-routing.module';

import { PolicyQuestionPage } from './policy-question.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PolicyQuestionPageRoutingModule
  ],
  declarations: [PolicyQuestionPage]
})
export class PolicyQuestionPageModule {}
