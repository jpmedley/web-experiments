'use strict';

function enumerateDevices() {
  navigator.usb.getDevices()
  .then(devices => {
    console.log("Total devices: " + devices.length);
    devices.forEach(device => {
      console.log("Product name: " + device.productName);
    });
  });
}

function deviceAdded(e) {
  console.log(e.device);
}

export {
  deviceAdded,
  enumerateDevices
};
