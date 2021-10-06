import { Timer } from './timer';

class TimerStore {
  store = new Map<number, Timer>();
  isActive = true;

  constructor() {}

  addTimer(timer: Timer): number {
    this.store.set(timer.id, timer);
    this.isActive && timer.start(this.store);
    return timer.id;
  }

  show(): void {
    /* 没有隐藏，不需要恢复定时器 */
    if (this.isActive) {
      return;
    }

    this.isActive = true;
    this.store.forEach((x: any) => x.start(this.store));
  }

  hide(): void {
    this.store.forEach((x: any) => x.suspend());
    this.isActive = false;
  }

  clear(id: number): void {
    const timer = this.store.get(id);
    if (!timer) {
      return;
    }

    if (timer.timerId !== undefined) {
      clearTimeout(timer.timerId);
    }

    timer.timerId = undefined;
    this.store.delete(id);
  }
}

export { TimerStore };
