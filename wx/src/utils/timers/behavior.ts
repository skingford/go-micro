import { Timer } from './timer';
import { TimerStore } from './timer-store';

const TimerBehavior = Behavior({
  data: {
    $timerStore: TimerStore as any
  },
  lifetimes: {
    created(): void {
      this.data.$timerStore = new TimerStore();
    },
    detached(): void {
      this.data.$timerStore.hide();
    }
  },
  pageLifetimes: {
    show(): void {
      this.data.$timerStore.show();
    },
    hide(): void {
      this.data.$timerStore.hide();
    }
  },
  methods: {
    $setTimeout(fn = () => {}, timeout = 0, ...arg: any[]): number {
      const timer = new Timer(false, fn, timeout, ...arg);
      return this.data.$timerStore.addTimer(timer);
    },
    $setInterval(fn = () => {}, timeout = 0, ...arg: any[]): number {
      const timer = new Timer(true, fn, timeout, arg);
      return this.data.$timerStore.addTimer(timer);
    },
    $clearInterval(id: number): void {
      this.data.$timerStore.clear(id);
    },
    $clearTimeout(id: number): void {
      this.data.$timerStore.clear(id);
    }
  }
});

export { TimerBehavior };
