class Animator {
  constructor(values, duration, func) {
    this.first = true;
    this.duration = duration;
    this.values = values;
    this.started = 0;
    this.func = func
  }
  
  animate() {
    let elapsed = 0;
    if (this.first) {
      this.first = false;
      this.started = millis();
    } else {
      elapsed = millis() - this.started;
    }
    if(elapsed > this.duration) {
      elapsed = 0;
      this.started = millis();
    }
    const stepValues = [];
    for(let each in this.values) {
      const val = this.values[each];
      const value = map(elapsed, 0, this.duration, val.start, val.end);
      stepValues.push(value);
    };
    this.func(stepValues);
  }
}