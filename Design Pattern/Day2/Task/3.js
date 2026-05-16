// Implementor
class Device {
  increaseVolume() {}
  decreaseVolume() {}
  mute() {}
}

// TV
class TV extends Device {
  increaseVolume() {
    console.log("TV volume increased");
  }

  decreaseVolume() {
    console.log("TV volume decreased");
  }

  mute() {
    console.log("TV muted");
  }
}

// Speaker
class Speaker extends Device {
  increaseVolume() {
    console.log("Speaker volume increased");
  }

  decreaseVolume() {
    console.log("Speaker volume decreased");
  }

  mute() {
    console.log("Speaker muted");
  }
}

// Abstraction
class RemoteControl {
  constructor(device) {
    this.device = device;
  }

  volumeUp() {
    this.device.increaseVolume();
  }

  volumeDown() {
    this.device.decreaseVolume();
  }
}

// Refined Abstraction
class AdvancedRemote extends RemoteControl {
  mute() {
    this.device.mute();
  }
}

const tv = new TV();

const basicRemote = new RemoteControl(tv);

basicRemote.volumeUp();
basicRemote.volumeDown();
// basicRemote.mute();

console.log("------------");

const advancedRemote = new AdvancedRemote(tv);

advancedRemote.mute();
