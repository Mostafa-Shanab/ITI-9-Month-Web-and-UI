import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { MoviesService } from '../../services/movies';
import { Movie } from '../../types/movie';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-stats',
  templateUrl: './movie-stats.html',
  styleUrl: './movie-stats.css',
  standalone: true,
  imports: []
})
export class MovieStats implements OnInit, OnDestroy {
  private moviesService = inject(MoviesService);
  private sub!: Subscription;

  totalMovies = 0;
  averageRating = 0;
  averageYear = 0;
  genreBreakdown: { genre: string; count: number }[] = [];

  ngOnInit() {
    this.sub = this.moviesService.movies$.subscribe((movies) => {
      this.calculateStats(movies);
    });
  }

  calculateStats(movies: Movie[]) {
    this.totalMovies = movies.length;
    if (movies.length === 0) {
      this.averageRating = 0;
      this.averageYear = 0;
      this.genreBreakdown = [];
      return;
    }

    const totalRating = movies.reduce((sum, m) => sum + m.rating, 0);
    this.averageRating = parseFloat((totalRating / movies.length).toFixed(1));

    const totalYear = movies.reduce((sum, m) => sum + m.year, 0);
    this.averageYear = Math.round(totalYear / movies.length);

    const genreCounts: { [key: string]: number } = {};
    movies.forEach((m) => {
      genreCounts[m.genre] = (genreCounts[m.genre] || 0) + 1;
    });

    this.genreBreakdown = Object.keys(genreCounts).map((genre) => ({
      genre,
      count: genreCounts[genre]
    }));
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
