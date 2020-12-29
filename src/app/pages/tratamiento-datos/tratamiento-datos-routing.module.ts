import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TratamientoDatosPage } from './tratamiento-datos.page';

const routes: Routes = [
  {
    path: '',
    component: TratamientoDatosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TratamientoDatosPageRoutingModule {}
