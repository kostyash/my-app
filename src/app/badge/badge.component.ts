import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss'
})
export class BadgeComponent {

  @Input() title!: string;
  @Output() onSelect = new EventEmitter<string>();

  onClick() {
    this.onSelect.emit(this.title);
  }

}
