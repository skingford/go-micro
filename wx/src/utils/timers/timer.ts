class Timer {
  static count: number;
  id!: number;
  timerId?: number;
  private fn: (v: Array<any>) => void;
  private timeout = 0;
  private restTime = 0;
  private isInterval = false;
  private arg: Array<any>;
  private startTime!: number;

  /**
   * 构造函数
   * @param {Boolean} isInterval 是否是 setInterval
   * @param {Function} fn 回调函数
   * @param {Number} timeout 定时器执行时间间隔
   * @param  {...any} arg 定时器其他参数
   */
  constructor(isInterval = false, fn = () => {}, timeout = 0, ...arg: Array<any>) {
    this.id = ++Timer.count; // 定时器递增 id
    this.fn = fn;
    this.timeout = timeout;
    this.restTime = timeout; // 定时器剩余计时时间
    this.isInterval = isInterval;
    this.arg = arg;
  }

  /* 启动或恢复定时器 */
  start(timerStore: Map<number, Timer>): void {
    /* 页面隐藏，不创建定时器 */
    this.startTime = +new Date();

    if (this.isInterval) {
      /* setInterval */
      const cb = (arg: Array<any>) => {
        this.fn(arg);
        /* timerId 为空表示被 clearInterval */
        if (this.timerId) {
          this.timerId = setTimeout(cb, this.timeout, ...this.arg);
        }
      };
      this.timerId = setTimeout(cb, this.restTime, ...this.arg);
      return;
    }

    /* setTimeout  */
    const cb = (...arg: any[]) => {
      this.fn(arg);
      timerStore.delete(this.id);
    };
    this.timerId = setTimeout(cb, this.restTime, ...this.arg);
  }

  /* 暂停定时器 */
  suspend(): void {
    if (this.timeout > 0) {
      const now = +new Date();
      const nextRestTime = this.restTime - (now - this.startTime);
      const intervalRestTime =
        nextRestTime >= 0 ? nextRestTime : this.timeout - (Math.abs(nextRestTime) % this.timeout);

      this.restTime = this.isInterval ? intervalRestTime : nextRestTime;
    }

    if (this.timerId !== undefined) {
      clearTimeout(this.timerId);
    }
  }
}

/* 定时器增量 id  */
Timer.count = 0;

export { Timer };
