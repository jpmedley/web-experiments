'use strict';

function deviceAdded(e) {
  console.log(e.device);
}

function deviceRemoved(e) {
  console.log(e);
}

function enumerateDevices() {
  navigator.usb.getDevices()
  .then(devices => {
    console.log("Total devices: " + devices.length);
    devices.forEach(device => {
      console.log("Product name: " + device.productName + ", serial number " + device.serialNumber);
    });
  });
}

async function requestDevice() {
  const filters = [
          {vendorId: 0x1209, productId: 0xa800},
        ];
  await navigator.usb.requestDevice({filters: filters})
        .then(device => {
          console.log("Product name: " + device.productName);
        })
        .catch(e => {
          console.log("There is not device. " + e);
        });
}

export {
  deviceAdded,
  deviceRemoved,
  enumerateDevices,
  requestDevice
};
