'use strict';

import Logger from "../logger.js";
const logger = new Logger("WebXR");

const vrCanvas = document.querySelector("#vr");
let xrDevice;

function setUpXR() {
  // It appears that I need a head-mounted display to test this with.
  navigator.xr.addEventListener('devicechange', (e) => {
    logger.log(e.target);
  }, (err) => {
    logger.error("Something went wrong.", err);
  });

  navigator.xr.requestDevice()
  .then(device => {
    xrDevice = device
  })
  .catch(err => {
    logger.error("No device was found. ", err);
  })
}

function getNESession() {
  const sessionOptions = {
    exclusive: false,
    outputContext: vrCanvas.getContext('xrpresent');
  }
  if (xrDevice) {
    xrDevice.requestSession(sessionOptions)
    .then(session => {
      //Do something with the session.
    })
    .catch(err => {
      logger.error("AR/VR session could not be created. ", err);
    });
  }
}



export {
  getNESession,
  setUpXR
}
