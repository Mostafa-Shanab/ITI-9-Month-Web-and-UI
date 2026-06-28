import { Component, Input } from '@angular/core';
import { Movie } from '../../types/movie';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css',
  standalone: true,
  imports: [NgClass]
})
export class MovieCard {
  @Input({ required: true }) movie!: Movie;
}
