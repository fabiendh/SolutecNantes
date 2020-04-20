import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/auth/auth.guard';
import { MCViewComponent } from './components/mc/mc-view/mc-view.component';
import { MCListComponent } from './components/mc/mc-list/mc-list.component';
import { DDCListComponent } from './components/ddc/ddc-list/ddc-list.component';
import { DDCViewComponent } from './components/ddc/ddc-view/ddc-view.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'customer',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'mc',
    component: MCListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'mc/new',
    component: MCViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'mc/:idDdc',
    component: MCViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'ddc',
    component: DDCListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'ddc/new',
    component: DDCViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'ddc/:idMc',
    component: DDCViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
