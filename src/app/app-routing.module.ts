import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { RestockComponent } from './pages/restock/restock.component';
import { TransactionComponent } from './pages/transaction/transaction.component';
import { WithdrawComponent } from './pages/withdraw/withdraw.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'overview',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'restock',
    component: RestockComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'withdraw',
    component: WithdrawComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'transactions',
    component: TransactionComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
