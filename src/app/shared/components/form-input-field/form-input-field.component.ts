import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-form-input-field',
  templateUrl: './form-input-field.component.html',
  styleUrls: ['./form-input-field.component.css']
})
export class FormInputFieldComponent {

  @Input() label!: string;
  @Input() type: string = 'text';
  @Input() control!: FormControl;

  get showErrors(): boolean {
    return this.control?.invalid && this.control?.touched;
  }

}
