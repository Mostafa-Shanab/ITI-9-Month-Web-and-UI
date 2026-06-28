import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { MoviesService } from './services/movies';
import { Movie } from './types/movie';
import { SearchBar } from './components/search-bar/search-bar';
import { MovieCard } from './components/movie-card/movie-card';
import { MovieStats } from './components/movie-stats/movie-stats';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
  imports: [SearchBar, MovieCard, MovieStats],
})
export class App implements OnInit, OnDestroy {
  moviesService = inject(MoviesService);

  movies: Movie[] = [];
  loading = false;
  error: string | null = null;
  success: string | null = null;

  private subs: Subscription[] = [];

  ngOnInit() {
    // 1. Subscribe to shared state of movies
    this.subs.push(
      this.moviesService.movies$.subscribe((list) => {
        this.movies = list;
      })
    );

    // 2. Subscribe to loading state
    this.subs.push(
      this.moviesService.loading$.subscribe((isLoading) => {
        this.loading = isLoading;
      })
    );

    // 3. Subscribe to error messages
    this.subs.push(
      this.moviesService.error$.subscribe((errMessage) => {
        this.error = errMessage;
      })
    );

    // 4. Subscribe to success messages
    this.subs.push(
      this.moviesService.success$.subscribe((successMessage) => {
        this.success = successMessage;
      })
    );
  }

  ngOnDestroy() {
    // Clean up subscriptions to avoid memory leaks
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
