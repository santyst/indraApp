import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)// , canActivate: [AuthGuard]
  },
  {
    path: 'user-data',
    loadChildren: () => import('./pages/user-data/user-data.module').then( m => m.UserDataPageModule)// , canActivate: [AuthGuard]
  },
  {
    path: 'private-data',
    loadChildren: () => import('./pages/private-data/private-data.module').then( m => m.PrivateDataPageModule)// , canActivate: [AuthGuard]
  },
  {
    path: 'confirm-data',
    loadChildren: () => import('./pages/confirm-data/confirm-data.module').then( m => m.ConfirmDataPageModule)// , canActivate: [AuthGuard]
  },
  {
    path: 'policy-question',
    loadChildren: () => import('./pages/policy-question/policy-question.module')
      .then( m => m.PolicyQuestionPageModule)// , canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
