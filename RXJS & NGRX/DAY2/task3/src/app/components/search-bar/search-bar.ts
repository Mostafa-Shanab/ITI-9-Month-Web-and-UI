import { Component, inject } from '@angular/core';
import { MoviesService } from '../../services/movies';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
  standalone: true,
  imports: []
})
export class SearchBar {
  moviesService = inject(MoviesService);

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.moviesService.search$.next(input.value);
  }
}
