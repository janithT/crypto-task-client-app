import { Component } from '@angular/core';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css'],
})
export class DashboardLayoutComponent {
  constructor(public config: AppConfigService) {}
}
