'use strict';

class Logger {
  constructor(experimentName, options) {
    this.experiment = experimentName;
  }

  log(message) {
    console.log("[" + this.experimentName + "] " + message);
  }

  error(message) {
    console.error("[" + ERROR + "][" + this.experimentName + "] " + message);
  }
}

export default Logger
