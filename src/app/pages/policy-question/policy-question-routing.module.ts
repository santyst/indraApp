import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PolicyQuestionPage } from './policy-question.page';

const routes: Routes = [
  {
    path: '',
    component: PolicyQuestionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PolicyQuestionPageRoutingModule {}
