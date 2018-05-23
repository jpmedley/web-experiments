'use strict';

async function requestDevice() {
  const filters = [
          {vendorId: 0x1209, productId: 0xa800},
      ];
  let device = await navigator.usb.requestDevice({filters: filters})
                     .catch(e => {
                       console.error("There is no device. " + e);
                     });
  if (device !== undefined) {
    console.log("Product name: " + device.productName);
  }
}

async function requestDevice_() {
  // Spec example.
  let device;
  const filters = [
          {vendorId: 0x1209, productId: 0xa800},
        ];
  try {
    device = await navigator.usb.requestDevice({filters: filters});
  } catch (e) {
    console.error("There is no device." + e);
  }

  if (device !== undefined) {
    console.log("Product name: " + device.productName);
  }
}

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

function deviceRemoved(e) {
  console.log(e);
}

export {
  deviceAdded,
  deviceRemoved,
  enumerateDevices,
  requestDevice
};
