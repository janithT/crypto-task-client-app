import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {

  @Input() class: string = 'btn btn-primary';
  @Input() label: string = 'Submit';
  @Input() type: 'button' | 'submit' = 'submit';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
}
