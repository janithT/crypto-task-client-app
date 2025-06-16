import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-status-filter',
  templateUrl: './status-filter.component.html',
  styleUrls: ['./status-filter.component.css']
})
export class StatusFilterComponent {

  @Output() statusChanged = new EventEmitter<string>();
  @Input() selected: string = 'all';

  emitChange(status: string): void {
    this.statusChanged.emit(status);
  }
}
