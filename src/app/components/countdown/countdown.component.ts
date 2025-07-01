import {
  ChangeDetectionStrategy,
  Component,
  effect,
  signal,
  computed,
  input,
  ChangeDetectorRef,
  inject,
} from '@angular/core';

import { Zone } from '../../types/zone';
import { TimeFormater } from '../../Pipes/date-diff.pipe';

@Component({
  selector: 'app-countdown',
  imports: [TimeFormater],
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountdownComponent {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  readonly zone = input.required<Zone | undefined>();

  // signals
  secondsLeft = signal<number>(0);
  readonly running = signal(false);

  // computed
  protected readonly countDownSec = computed(() => {
    if (!this.zone) return 0;

    return (
      this.zone()?.bypassAllEscapeSec !== null && this.zone()?.bypassAllEscapeSec! > 0
        ? this.zone()?.bypassAllEscapeSec
        : 0
    ) as number;
  });

  // Properties
  protected intervalId: any;

  constructor() {
    effect(() => {
      this.secondsLeft.set(this.countDownSec());
    });
    effect(() => {
      if (this.countDownSec() > 0) {
        this.running.set(true);
        this.startTimer();
      }
    });

    effect(() => {
      if (this.running()) {
        this.startTimer();
      } else {
        this.clearTimer();
      }
    });
  }

  startTimer() {
    this.clearTimer(); // 保險起見
    this.intervalId = setInterval(() => {
      const newVal = this.secondsLeft() - 1;
      if (newVal >= 0) {
        this.secondsLeft.set(newVal);
      } else {
        this.running.set(false); // 倒數結束
      }
      this.changeDetectorRef.detectChanges();
    }, 1000);
  }

  clearTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.changeDetectorRef.detectChanges();
    }
  }

  toggleTimer() {
    this.running.set(!this.running());
  }

  reset() {
    this.clearTimer();
    this.secondsLeft.set(this.countDownSec());
    this.running.set(false);
  }
}
