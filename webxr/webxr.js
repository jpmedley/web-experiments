'use strict';

import Logger from "../logger.js";
const _Logger = new Logger("WebXR");

function getDevice() {
  navigator.xr.requestDevice()
  .then(xrDevice => {
    _Logger.log("xrDevice");
  })
  .catch(err => {
    _Logger.error("Unable to find XR device.");
  });
}

export {
  getDevice
}
