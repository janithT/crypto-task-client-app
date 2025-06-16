import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardLayoutRoutingModule } from './dashboard-layout-routing.module';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';


@NgModule({
  declarations: [
    DashboardLayoutComponent,
    SidebarComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    DashboardLayoutRoutingModule
  ]
})
export class DashboardLayoutModule { }
