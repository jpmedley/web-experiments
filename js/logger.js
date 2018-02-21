'use strict';

export default class {
  constructor(experimentName, options) {
    this.experiment = experimentName;
  }

  log(message, anObject) {
    console.log("[" + this.experiment + "] " + message);
    if (anObject) {
      for (let prop in anObject) {
        console.log("\t" + prop + ": " + anObject[prop]);
      }
    }
  }

  error(message, err) {
    console.error("[" + this.experiment + "][ERROR] " + message);
    console.error("       " + err);
  }
}
