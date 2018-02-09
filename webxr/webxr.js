'use strict';

import Logger from "../logger.js";
const logger = new Logger("WebXR");

function setUpXR() {
  // It appears that I need a head-mounted display to test this with.
  navigator.xr.addEventListener('devicechange', (e) => {
    logger.log(e.target);
    getSession();
  }, (err) => {
    logger.error("Something went wrong.", err);
  });
}

function getSession() {
  // Has the wrong type which causes supportsSession() to blow up.
  const xrContext = window.XRPresentationContext
  const sessionOptions = {
    exclusive: true,
    outputContext: xrContext
  }
  navigator.xr.requestDevice()
  .then(device => {
    device.supportsSession(sessionOptions)
    .then(() => {
      device.requestSession(sessionOptions)
      .then(session => {
        logger.log(session.exclusive)
      });
    });
  });
}

function getDevice() {
  // As per spec, but doesn't currently work because Chrome throws 'Uncaught
  //   type error instead of rejecting the Promise with 'NotFoundError'.
  navigator.xr.requestDevice()
  .then(xrDevice => {
    logger.log(xrDevice.external);
  })
  .catch(err => {
    logger.error("Unable to find XR device.");
  });
}

export {
  getDevice,
  setUpXR
}
