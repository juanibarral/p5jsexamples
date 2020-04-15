/**
 * Animator.js
 * Class to animate objects inside the draw function
 * Author: Juan Ibara <juanibarral@gmail.com>
 * params <object> Object to setup the animator:
 *   duration <number> (mandatory): Duration in milliseconds
 *   values <array> (mandatory): Array of objects with start and end values
 *   animation <function> (mandatory): function that will use the values to animate
 *   noLoop <boolean> (Optional): If the animation will loop or not
 */
class Animator {
  constructor(params) {
    this.first = true
    this.running = true;
    this.duration = params.duration ? params.duration : 5000
    this.values = params.values
    this.started = 0
    this.animation = params.animation
    this.noLoop = params.noLoop
  }

  animate() {
    let elapsed = 0;
    if (this.first) {
      this.first = false;
      this.started = millis();
    } else {
      elapsed = millis() - this.started;
    }
    if (elapsed > this.duration) {
      if (this.noLoop) {
        this.running = false;
      } else {
        elapsed = 0;
        this.started = millis();
      }
    }
    if (!this.running) {
      elapsed = this.duration
    }
    const stepValues = [];
    for (let each in this.values) {
      const val = this.values[each];
      const value = map(elapsed, 0, this.duration, val.start, val.end);
      stepValues.push(value);
    }

    this.animation(stepValues);
  }
}
