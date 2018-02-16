'use strict';

// import "../js/third-party/cottontail.debug.js";
import Logger from "../js/logger.js";
const logger = new Logger("WebXR");

function getCotton(session) {
  let gl = createWebGLContext({
    compatibleXRDevice: session.device
  });
  let renderer = new Renderer(gl);
  let scene = new CubeSeaScene();
  scene.setRenderer(renderer);
  session.baseLayer = new XRWebGLLayer(session, gl);
  return session;
}

export {
  getCotton
}
