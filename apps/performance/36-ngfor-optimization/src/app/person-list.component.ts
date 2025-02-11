import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import {
  CdkFixedSizeVirtualScroll,
  CdkVirtualForOf,
  CdkVirtualScrollViewport,
} from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { Person } from './person.model';

@Component({
  selector: 'app-person-list',
  imports: [
    CommonModule,
    CdkVirtualScrollViewport,
    CdkVirtualForOf,
    CdkFixedSizeVirtualScroll,
  ],
  template: `
    <cdk-virtual-scroll-viewport class="h-[300px] w-full" itemSize="50">
      <!-- Adjust itemSize based on your item height -->
      <div
        *cdkVirtualFor="let person of persons; trackBy: trackByEmail"
        class="flex items-center justify-between border-b">
        <h3>{{ person.name }}</h3>
        <div class="flex gap-10 py-1">
          <button
            class="rounded-md border bg-blue-500 p-2 text-white"
            (click)="update.emit(person.email)">
            UPDATE
          </button>
          <button
            class="rounded-md border bg-red-500 p-2 text-white"
            (click)="delete.emit(person.email)">
            DELETE
          </button>
        </div>
      </div>
    </cdk-virtual-scroll-viewport>
  `,
  host: {
    class: 'w-full flex flex-col',
  },
  changeDetection: ChangeDetectionStrategy.OnPush, // Use OnPush change detection
})
export class PersonListComponent {
  @Input() persons: Person[] = [];
  @Output() delete = new EventEmitter<string>();
  @Output() update = new EventEmitter<string>();

  trackByEmail(index: number, person: Person): string {
    return person.email; // Use email as the unique identifier
  }
}
