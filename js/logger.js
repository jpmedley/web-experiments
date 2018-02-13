'use strict';

export default class {
  constructor(experimentName, options) {
    this.experiment = experimentName;
  }

  log(message) {
    console.log("[" + this.experiment + "] " + message);
  }

  error(message, err) {
    console.error("[" + this.experiment + "][ERROR] " + message);
    console.error("       " + err);
  }
}
