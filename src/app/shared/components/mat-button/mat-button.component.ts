import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mat-button',
  templateUrl: './mat-button.component.html',
  styleUrls: ['./mat-button.component.css']
})
export class MatButtonComponent {
  @Input() text: string = 'Submit';
  @Input() color: string = 'primary'; // 'primary' | 'accent' | 'warn'
  @Input() type: string = 'submit';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
}
