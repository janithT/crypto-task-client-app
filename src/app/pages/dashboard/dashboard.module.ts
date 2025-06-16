import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { TasksComponent } from './tasks/tasks.component';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddTaskComponent } from './tasks/add-task/add-task.component';
import { UpdateTaskComponent } from './tasks/update-task/update-task.component';


@NgModule({
  declarations: [
    HomeComponent,
    TasksComponent,
    AddTaskComponent,
    UpdateTaskComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    SharedModule
  ]
})
export class DashboardModule { }
