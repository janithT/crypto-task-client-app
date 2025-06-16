import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TasksComponent } from './tasks/tasks.component';
import { AddTaskComponent } from './tasks/add-task/add-task.component';
import { UpdateTaskComponent } from './tasks/update-task/update-task.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'tasks', component: TasksComponent },
      { path: 'tasks/create', component: AddTaskComponent },
      { path: 'task/edit/:id',  component: UpdateTaskComponent},
      // {
      //   path: 'tasks/create',
      //   loadComponent: () =>
      //     import('./tasks/add-task/add-task.component').then(m => m.AddTaskComponent)
      // },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }


