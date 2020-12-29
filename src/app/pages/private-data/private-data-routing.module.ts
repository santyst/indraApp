import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrivateDataPage } from './private-data.page';

const routes: Routes = [
  {
    path: '',
    component: PrivateDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateDataPageRoutingModule {}
