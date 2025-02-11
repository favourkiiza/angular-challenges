import { NgIf } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { generateList } from './generateList';
import { PersonService } from './list.service';
import { PersonListComponent } from './person-list.component';

@Component({
  imports: [
    NgIf,
    PersonListComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [PersonService],
  selector: 'app-root',
  template: `
    <button
      (click)="loadMoreItems()"
      class="rounded-md border border-black p-2">
      Load More
    </button>

    <app-person-list
      [persons]="persons()"
      (loadMore)="loadMoreItems()"
      class="w-3/4 max-w-2xl" />
  `,
  host: {
    class: 'flex items-center flex-col gap-5',
  },
})
export class AppComponent {
  /* readonly persons = signal(generateList());
  readonly loadList = signal(false);*/
  readonly persons = signal<any[]>([]); // Use a signal to manage the list
  private batchSize = 20; // Number of items to load at a time
  private currentIndex = 0;
  constructor() {
    this.loadMoreItems(); // Load initial batch
  }

  loadMoreItems() {
    const newItems = generateList().slice(
      this.currentIndex,
      this.currentIndex + this.batchSize,
    );
    this.persons.update((current) => [...current, ...newItems]);
    this.currentIndex += this.batchSize;
  }

  /* label = '';*/
}
