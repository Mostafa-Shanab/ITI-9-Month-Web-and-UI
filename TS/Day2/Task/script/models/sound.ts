export class SoundEngine {
  private flip_sound = new Audio("./assets/audio/flip.mp3");
  private match_sound = new Audio("./assets/audio/good.mp3");
  private wrong_sound = new Audio("./assets/audio/fail.mp3");
  private win_sound = new Audio("./assets/audio/game-over.mp3");
  private bg_music = new Audio("./assets/audio/fulltrack.mp3");

  constructor() {
    this.bg_music.loop = true;
    this.bg_music.volume = 1;
    this.flip_sound.volume = 1;
    this.match_sound.volume = 1;
    this.wrong_sound.volume = 1;
    this.win_sound.volume = 1;

    document.addEventListener("click", () => this.bg_music.play(), {
      once: true,
    });
  }

  flip() {
    this.flip_sound.currentTime = 0;
    this.flip_sound.play();
  }
  match() {
    this.match_sound.currentTime = 0;
    this.match_sound.play();
  }
  mismatch() {
    this.wrong_sound.currentTime = 0;
    this.wrong_sound.play();
  }
  win() {
    this.bg_music.pause();
    this.win_sound.currentTime = 0;
    this.win_sound.play();
  }
}
