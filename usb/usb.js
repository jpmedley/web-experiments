'use strict';

let usbDevice;

async function claimInterface() {
  if (!usbDevice) {
    await requestDevice();
  }
  if (usbDevice) {
    await usbDevice.open();
    if (!usbDevice.configuration) {
      await usbDevice.selectConfiguration(1);
    }
    await usbDevice.claimInterface(0);
  }
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
    if ((typeof usbDevice[prop]) !== "function") {
      console.log(prop + "=" + usbDevice[prop]);
    }
  }
}

const EXT_USB = [
        {vendorId: 0x1209, productId: 0xa800},
      ];
const TEST_USB = [
  { vendorId: 'MuSB' }
]
const ALL = EXT_USB.concat(TEST_USB);

async function requestDevice_() {
  const filters = ALL;
  usbDevice = await navigator.usb.requestDevice({filters: filters});
  console.log("Product name: " + usbDevice.productName);
}

async function requestDevice() {
  const filters = ALL;
  await navigator.usb.requestDevice({filters: filters})
        .then(device => {
          usbDevice = device;
          console.log("Product name: " + device.productName);
        })
        .catch(e => {
          console.log("There is no device. " + e);
        });
}

const BLUE = [0, 0, 255];
const GREEN = [0, 255, 0];
const LT_BLUE = [0, 0, 64];
const LT_GREEN = [0, 64, 0];
const LT_RED = [64, 0, 0];
const OFF = [0, 0, 0];
const RED = [255, 0, 0];
const WHITE = [255, 255, 255];

async function setColor() {
  await claimInterface();
  if (usbDevice.productId == '43008') {
    setDeviceColor(...LT_GREEN);
  }
}

async function setDeviceColor(r, g, b) {
  if (usbDevice.opened) {
    let payload = new Uint8Array([r, g, b]);

    if (payload == null) {
      throw new Error(`Unknown device firmware version ${usbDevice.usbVersionMajor}`);
    }

    await usbDevice.controlTransferOut({
      requestType: 'vendor',
      recipient: 'device',
      request: 1,
      value: 0,
      index: 0,
    }, payload);
  }
}

export {
  claimInterface,
  deviceAdded,
  deviceRemoved,
  enumerateDevices,
  inspectDevice,
  requestDevice,
  setColor
};
