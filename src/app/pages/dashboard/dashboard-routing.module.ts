import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardLayoutComponent } from 'src/app/layouts/dashboard-layout/dashboard-layout/dashboard-layout.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tasks', loadComponent: () => import('./tasks/tasks.component').then(m => m.TasksComponent) },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }


