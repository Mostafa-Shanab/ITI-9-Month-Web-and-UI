import { BACK_IMAGE, IMAGE_PATH, TOTAL_IMAGES } from "../config/config.js";
import { CardState } from "./../interfaces/cardState";
import { SoundEngine } from "./sound.js";

export class MemoryGame {
  private cards: CardState[] = [];
  private flipped: CardState[] = [];
  private locked = false;
  private matches = 0;
  private count = 1;
  private readonly totalPairs = TOTAL_IMAGES;
  private sound = new SoundEngine();
  private progressEl = document.querySelector<HTMLElement>(".progress")!;
  private cardsContainer = document.querySelector<HTMLElement>(".cards")!;
  private FLIP_BACK_DELAY = 1000;

  constructor() {
    this.buildCards();
    this.shuffle();
    this.updateProgress();
  }

  // ── Build 22 cards dynamically (each image appears twice)

  private buildCards() {
    this.cardsContainer.innerHTML = ""; // clear any static HTML cards

    // Create one pair per image
    for (let i = 0; i < TOTAL_IMAGES; i++) {
      this.cards.push(this.createCard(i));
      this.cards.push(this.createCard(i)); // second card of the pair
    }

    this.cards.forEach((c) => this.cardsContainer.appendChild(c.element));
  }

  private createCard(imageIndex: number): CardState {
    const imageSrc = `${IMAGE_PATH}${imageIndex}.jpg`;

    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.src = BACK_IMAGE;
    img.alt = "card";
    img.dataset.src = imageSrc; // store real image for flipping

    const span = document.createElement("span");
    span.innerText = `${this.count++}`;

    card.appendChild(img);
    card.appendChild(span);

    const state: CardState = {
      element: card,
      imageIndex,
      isFlipped: false,
      isMatched: false,
    };

    card.addEventListener("click", () => this.onCardClick(state));
    return state;
  }

  private shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
    this.cards.forEach((c) => this.cardsContainer.appendChild(c.element));
  }

  private onCardClick(card: CardState) {
    if (this.locked || card.isFlipped || card.isMatched) return;

    this.sound.flip();
    this.flipCard(card, true);
    this.flipped.push(card);

    if (this.flipped.length === 2) {
      this.locked = true;
      this.checkMatch();
    }
  }

  private flipCard(card: CardState, faceUp: boolean) {
    card.isFlipped = faceUp;
    const img = card.element.querySelector("img")!;
    card.element.classList.add("flipping");
    card.element.classList.add("flippedClass");

    setTimeout(() => {
      img.src = faceUp ? img.dataset.src! : BACK_IMAGE;
      card.element.classList.remove("flipping");
    }, 150);
  }

  private checkMatch() {
    const [a, b] = this.flipped;
    const isMatch = a.imageIndex === b.imageIndex;

    if (isMatch) {
      this.sound.match();
      a.isMatched = b.isMatched = true;
      a.element.classList.add("matched");
      b.element.classList.add("matched");
      this.matches++;
      this.updateProgress();
      this.flipped = [];
      this.locked = false;
      if (this.matches === this.totalPairs) setTimeout(() => this.onWin(), 400);
    } else {
      this.sound.mismatch();
      a.element.classList.add("wrong");
      b.element.classList.add("wrong");
      setTimeout(() => {
        this.flipCard(a, false);
        this.flipCard(b, false);
        a.element.classList.remove("wrong");
        a.element.classList.remove("flippedClass");
        b.element.classList.remove("wrong");
        b.element.classList.remove("flippedClass");
        this.flipped = [];
        this.locked = false;
      }, this.FLIP_BACK_DELAY);
    }
  }

  private updateProgress() {
    const pct = Math.round((this.matches / this.totalPairs) * 100);
    this.progressEl.style.width = pct + "%";
    this.progressEl.textContent = pct + "%";
  }

  private onWin() {
    this.sound.win();
    const banner = document.createElement("div");
    banner.className = "win-banner";
    banner.textContent = "You Win! Reload to play again.";
    document.querySelector(".container")!.prepend(banner);
  }
}
