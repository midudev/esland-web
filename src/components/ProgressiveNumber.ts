const lerp = (a: number, b: number, alpha: number): number => {
  return a + alpha * (b - a);
};

const easeOutCubic = (value: number): number => {
  return 1 - Math.pow(1 - value, 3);
};

function cal(value: number | (() => number)) {
  return typeof value === "function" ? value() : value;
}

export default class ProgressiveNumber {
  private initial: number;
  private duration: number;
  private decimals: number;
  private delay: number;
  private target: number;
  private current: number;
  private steps: number = 1;
  private currentStep = 1;
  private timer: number | NodeJS.Timeout = 0;

  constructor(
    initial: number | (() => number),
    duration: number = 1500,
    decimals: number = 0,
    delay: number = 5
  ) {
    initial = cal(initial);
    this.target = initial;
    this.current = initial;
    this.initial = initial;
    this.duration = duration;
    this.decimals = decimals;
    this.delay = delay;
  }

  static generate(initial: number, final: number, resolve: ((value?: number) => void),  duration: number = 1500, decimals: number = 0, delay: number = 5) {
    new this(initial, duration, decimals, delay).generate(final, resolve);
  }

  generate(
    value: number | ((prevTarget: number) => number),
    resolve: (count: number, step: number) => void
  ): void {
    this.start(value)
    resolve(this.value, this.currentStep);
    this.schedule(resolve);
  }

  start(value: number | ((prevTarget: number) => number)) {
    const nextTarget = typeof value === "function" ? value(this.target) : value;
    const steps = Math.max(Math.floor(this.duration / this.delay), 1);
    this.steps = steps;
    this.target = nextTarget;
    this.currentStep = 1;
    this.current = lerp(this.initial, nextTarget, easeOutCubic(1 / steps));
    return this.value;
  }

  schedule(resolve: ((value: number, step: number) => void), loop: boolean = true) {
    if (loop) {
      return this.timer = setTimeout(this.loop.bind(this, resolve), this.delay);
    }
    // ideal para react aun tengo conocimiento del mismo
    return this.timer = setTimeout(this.next.bind(this, resolve), this.delay)
  }

  next(resolve: (value: number, step: number) => void) {
    const progress = this.currentStep / this.steps;
    let next = true;
    if (progress === 1) {
      this.current = this.target;
      next = false;
    } else {
      this.current = lerp(
        this.initial,
        this.target,
        easeOutCubic(progress)
      );
      this.currentStep++;
    }
    resolve(this.value, this.currentStep);
    return next;
  }

  loop(resolve: (value: number, step: number) => void) {
    clearTimeout(this.timer);
    if (this.next(resolve)) {
      this.schedule(resolve)
    }
  }

  get value() {
    return Number(this.current.toFixed(this.decimals));
  }
}
