import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BadgeComponent } from '../badge/badge.component';

@Component({
  selector: 'app-placeholders-list',
  standalone: true,
  imports: [NgFor, BadgeComponent],
  templateUrl: './placeholders-list.component.html',
  styleUrl: './placeholders-list.component.scss'
})
export class PlaceholdersListComponent {

  @Input() placeholders!: string[];

  @Output() placeholderSelected = new EventEmitter<string>();

  onBadgeSelected(value: string) {
    this.placeholderSelected.emit(value);
  }
}
