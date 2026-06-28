import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject, of } from 'rxjs';
import { map, switchMap, tap, catchError, debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { Movie, RawTvShow } from '../types/movie';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private http = inject(HttpClient);

  // Shared state: BehaviorSubjects storing search results, loading, success, and error states
  private moviesSubj$ = new BehaviorSubject<Movie[]>([]);
  movies$ = this.moviesSubj$.asObservable();

  private loadingSubj$ = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubj$.asObservable();

  private errorSubj$ = new BehaviorSubject<string | null>(null);
  error$ = this.errorSubj$.asObservable();

  private successSubj$ = new BehaviorSubject<string | null>(null);
  success$ = this.successSubj$.asObservable();

  // Event Subject to push the user's keystrokes
  search$ = new Subject<string>();

  constructor() {
    this.initSearchPipeline();
  }

  /**
   * Main reactive search pipeline
   */
  private initSearchPipeline() {
    this.search$.pipe(
      // 1. Wait briefly (300ms) before sending request to reduce unnecessary API calls (debouncing)
      debounceTime(300),
      distinctUntilChanged(),
      // Side effect: if the query is empty, reset the shared state and do NOT make an API call
      tap((query) => {
        if (!query.trim()) {
          this.moviesSubj$.next([]);
          this.loadingSubj$.next(false);
          this.errorSubj$.next(null);
          this.successSubj$.next(null);
        }
      }),
      // 2. Ignore empty searches by filtering them out of the API pipeline
      filter((query) => query.trim().length > 0),
      // Set loading state and clear messages before starting request
      tap(() => {
        this.loadingSubj$.next(true);
        this.errorSubj$.next(null);
        this.successSubj$.next(null);
      }),
      // 3. switchMap cancels any previous pending request whenever a new character is emitted
      switchMap((query) => {
        // Line 5 API from apis.txt (using search query)
        const url = `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query.trim())}`;
        
        return this.http.get<RawTvShow[]>(url).pipe(
          // 4. Transform the API response into a simplified Movie model before emitting
          map((response) => this.transformTvShowsToMovies(response)),
          catchError((err) => {
            // Track errors
            this.errorSubj$.next(err.message || 'Failed to fetch movies from the TVmaze API.');
            return of([] as Movie[]); // fallback to empty list on error
          })
        );
      }),
      // Handle loading complete and success messages
      tap((movies) => {
        this.loadingSubj$.next(false);
        if (movies.length > 0) {
          this.successSubj$.next(`Successfully loaded ${movies.length} shows/movies!`);
        } else {
          this.successSubj$.next('No movies match your search query.');
        }
      })
    ).subscribe({
      next: (movies) => {
        // Save the results in our shared state BehaviorSubject
        this.moviesSubj$.next(movies);
      },
      error: (err) => {
        console.error('Search Pipeline Error:', err);
        this.errorSubj$.next(err.message || 'An unexpected error occurred in the search pipeline.');
        this.loadingSubj$.next(false);
      }
    });
  }

  /**
   * Maps raw TV show data to our simplified Movie model
   */
  private transformTvShowsToMovies(shows: RawTvShow[]): Movie[] {
    return shows.map((item) => {
      const show = item.show;

      // Extract release year from premiered date (e.g. "2008-01-20" -> 2008)
      let releaseYear = 2020;
      if (show.premiered) {
        const yearStr = show.premiered.substring(0, 4);
        const parsedYear = parseInt(yearStr, 10);
        if (!isNaN(parsedYear)) {
          releaseYear = parsedYear;
        }
      }

      // Default high-quality placeholder image if no poster is returned by the API
      const posterUrl = show.image?.medium || 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=200&auto=format&fit=crop';

      return {
        id: show.id,
        title: show.name,
        director: show.network?.name || 'Streaming / Indie Studio',
        year: releaseYear,
        genre: show.genres && show.genres.length > 0 ? show.genres[0] : 'Drama',
        poster: posterUrl,
        rating: show.rating?.average || 7.0, // Default to a standard 7.0 rating if missing
        role: show.status || 'Ended' // Map show status (Running, Ended, etc.) to the role/status field
      };
    });
  }
}
