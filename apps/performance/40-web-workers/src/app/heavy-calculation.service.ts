import { Injectable, computed, signal } from '@angular/core';

@Injectable()
export class HeavyCalculationService {
  private finalLength = 664579;
  private loadingLength = signal(0);
  private worker: Worker;

  loadingPercentage = computed(
    () => (this.loadingLength() * 100) / this.finalLength,
  );
  constructor() {
    // Create a new web worker
    this.worker = new Worker(new URL('./app.worker', import.meta.url));

    // Listen for messages from the worker
    this.worker.onmessage = ({ data }) => {
      this.loadingLength.set(data.loadingLength); // Update the progress
    };
  }

  startLoading() {
    this.worker.postMessage({ finalLength: this.finalLength }); // Start the computation
  }
}
