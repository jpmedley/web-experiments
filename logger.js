'use strict';

export default class {
  constructor(experimentName, options) {
    this.experiment = experimentName;
  }

  log(message) {
    console.log("[" + this.experiment + "] " + message);
  }

  error(message, err) {
    console.error("[" + ERROR + "][" + this.experiment + "] " + message);
    console.error("       " + err);
  }
}
