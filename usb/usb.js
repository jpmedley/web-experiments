'use strict';

let usbDevice;

async function claimInterface() {
  if (!usbDevice) {
    await requestDevice();
  }
  await usbDevice.open();
  if (!usbDevice.configuration) {
    await usbDevice.selectConfiguration(1);
  }
  // Interface numbers are device-dependent.
  await usbDevice.claimInterface(0);
}

function deviceAdded(e) {
  usbDevice = e.device;
  console.log(e.device);
}

function deviceRemoved(e) {
  usbDevice = null;
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

async function inspectDevice() {
  if (!usbDevice) {
    await claimInterface();
  }
  for (let prop in usbDevice) {
    console.log(prop + ": " + usbDevice[prop]);
  }
}

async function requestDevice() {
  const filters = [
          {vendorId: 0x1209, productId: 0xa800},
        ];
  await navigator.usb.requestDevice({filters: filters})
        .then(device => {
          usbDevice = device;
          console.log("Product name: " + device.productName);
        })
        .catch(e => {
          console.log("There is not device. " + e);
        });
}

export {
  claimInterface,
  deviceAdded,
  deviceRemoved,
  enumerateDevices,
  inspectDevice,
  requestDevice
};
