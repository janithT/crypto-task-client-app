import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-mat-input-field',
  templateUrl: './mat-input-field.component.html',
  styleUrls: ['./mat-input-field.component.css']
})
export class MatInputFieldComponent {
  @Input() label!: string;
  @Input() control!: FormControl;
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
}
