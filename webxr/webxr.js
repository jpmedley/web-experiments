'use strict';

import Logger from "../logger.js";
const logger = new Logger("WebXR");

const vrCanvas = document.querySelector("#vr");
let xrDevice;
let xrButton;
let sessionOptions;

function setUpXR() {
  navigator.xr.addEventListener('devicechange', (e) => {
    logger.log(e.type + ", " + e.target);
  }, (err) => {
    logger.error("Something went wrong.", err);
  });

  xrButton = document.querySelector("#enterVR");
  if (xrButton) {
    xrButton.addEventListener('click', _enterVR);
  }

  return navigator.xr.requestDevice()
  .then(device => {
    xrDevice = device;
    logger.log("Device found.");
  })
  .catch(err => {
    logger.error("No device was found. ", err);
  });
}

function runNELoop() {

}

function getNESession() {
  sessionOptions = {
    exclusive: false,
    outputContext: vrCanvas.getContext('xrpresent')
  }
  if (xrDevice) {
    return xrDevice.requestSession(sessionOptions)
    .then(session => {
      logger.log("Session retrieved.");
      //Do something with the session.
    })
    .catch(err => {
      logger.error("AR/VR session could not be created. ", err);
    });
  }
}

function getSession() {
  sessionOptions = {
    exclusive: true,
    outputContext: vrCanvas.getContext('xrpresent')
  }
  return xrDevice.supportsSession(sessionOptions)
  .then(session => {
    xrButton.style.display = "block";
  })
  .catch(err => {
    logger.error("AR/VR session could not be created. ", err);
  })
}

function _enterVR() {
  xrDevice.requestSession(sessionOptions)
  .then(session => {
    logger.log("YIPPIE! I Have an XR session.");
  });
}

export {
  getNESession,
  getSession,
  runNELoop,
  setUpXR
}
