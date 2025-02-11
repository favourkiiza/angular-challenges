import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { NgForTrackByModule } from '@angular-challenges/shared/directives';
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
    NgForTrackByModule,
    CdkVirtualScrollViewport,
    CdkFixedSizeVirtualScroll,
    CdkVirtualForOf,
  ],
  template: `
    <cdk-virtual-scroll-viewport
      class="h-[300px] w-full"
      itemSize="50"
      (scrolledIndexChange)="onScroll($event)">
      <div
        *cdkVirtualFor="let person of persons; trackBy: trackByEmail"
        class="flex h-9 items-center justify-between border-b">
        <h3>{{ person.name }}</h3>
        <p>{{ person.email }}</p>
      </div>
    </cdk-virtual-scroll-viewport>
  `,
  host: {
    class: 'w-full flex flex-col',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonListComponent {
  /*  @Input() persons: Person[] = [];*/
  @Input() persons: Person[] = [];
  @Output() loadMore = new EventEmitter<void>(); // Emit event when more items are needed

  trackByEmail(index: number, person: Person): string {
    return person.email; // Use email as the unique identifier
  }

  onScroll(index: number) {
    // Load more items when the user scrolls near the end of the list
    if (index >= this.persons.length - 10) {
      this.loadMore.emit();
    }
  }
}
