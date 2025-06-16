import { Injectable } from '@angular/core';
import { environment } from 'src/envs/environment';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  readonly appName = environment.appName;
}
