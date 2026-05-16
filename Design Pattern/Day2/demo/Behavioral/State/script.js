// class MedialPlayer {
//   constructor() {
//     this.state = "stopped";
//   }

//   play() {
//     if ((this.state = "stopped")) {
//       console.log("start playing");
//       this.state = "playing";
//     } else if ((this.state = "paused")) {
//       console.log("resume playing");
//       this.state = "playing";
//     }
//     if ((this.state = "playing")) {
//       console.log("already playing");
//     }
//   }

//   pause() {
//     if ((this.state = "paused")) {
//       console.log("can not pause");
//     }
//     if ((this.state = "playing")) {
//       console.log("paused");
//       this.state = "paused";
//     }
//   }

//   stop() {
//     if ((this.state = "paused")) {
//       this.state = "stopped";
//       console.log("stopped");
//     } else if ((this.state = "playing")) {
//       console.log("stopped");
//       this.state = "stopped";
//     }
//   }
// }

class MediaPlayer {
  constructor() {
    this.state = new StopState();
  }

  setState(state) {
    this.state = state;
  }

  play() {
    this.state.play();
  }
  pause() {
    this.state.pause();
  }
  stop() {
    this.state.stop();
  }
}

//State Pattern
class State {
  play(player) {}
  pause(player) {}
  stop(player) {}
}

class PlayingState extends State {
  play(player) {
    console.log("already playing");
  }
  pause(player) {
    console.log("paused");
    player.setState(new PauseState());
  }
  Stop(player) {
    console.log("Stopped");
    player.setState(new StopState());
  }
}

class PausedState extends State {
  play(player) {
    console.log("start playing");
    player.setState(new PlayingState());
  }
  pause(player) {
    console.log("already paused");
  }
  Stop(player) {
    console.log("Stopped");
    player.setState(new StoppedState());
  }
}

class StopState extends State {
  play(player) {
    console.log("start playing");
    player.setState(new PlayingState());
  }
  pause(player) {
    console.log("paused");
    player.setState(new PauseState());
  }
  Stop(player) {
    console.log("already Stopped");
  }
}

//client code
const player = new MediaPlayer();
player.play();
player.pause();
player.stop();
