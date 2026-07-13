import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TimerService {
  seconds = signal(0);
  timerStatus = signal<'idle' | 'running' | 'paused'>('idle');
  private timerInterval: any = null;

  formattedTime = computed(() => {
    const total = this.seconds();
    const hours = Math.floor(total / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    const secs = total % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  });

  startTimer(): void {
    if (this.timerStatus() !== 'running') {
      this.timerStatus.set('running');
      this.clearInterval();
      this.timerInterval = setInterval(() => {
        this.seconds.update(s => s + 1);
      }, 1000);
    }
  }

  pauseTimer(): void {
    if (this.timerStatus() === 'running') {
      this.timerStatus.set('paused');
      this.clearInterval();
    }
  }

  stopTimer(): void {
    this.timerStatus.set('idle');
    this.clearInterval();
    this.seconds.set(0);
  }

  private clearInterval(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }
}