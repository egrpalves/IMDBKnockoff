import { Component, OnInit } from '@angular/core';
import { Movie } from '../interfaces/movie';
import { ServerService } from '../services/server.service';
import { StorageService } from '../services/storage.service';

@Component({
    selector: 'app-movies',
    templateUrl: './movies.component.html',
    styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
    public searchDetails: Movie[] = [];
    public favorites: Movie[];
    public searchValue: string = '';
    public displayedColumns: string[] = ['title', 'year', 'commands'];
    public searchErrorMessage: string = '';

    constructor(public server: ServerService<Movie[]>, public storage: StorageService) {
        this.favorites = this.storage.retrieve('favorites') || [];
    }

    ngOnInit(): void {}

    public search(searchValue: string): void {
        this.server.getMovie(searchValue).subscribe((data: any) => {
            if (data.Response === 'True') {
                this.searchDetails = data.Search;
            } else {
                this.searchErrorMessage = 'MOVIES.NO_RESULTS';
                this.searchDetails = [];
            }
        });
    }

    public addRemoveFavorite(movie: Movie): void {
        this.favorites = this.favorites.includes(movie)
            ? this.favorites.filter((item) => item !== movie)
            : [...this.favorites, movie];
        this.storage.store('favorites', this.favorites);
    }

    public movieDetails(movie: Movie): void {
        this.server.getMovieDetails(movie.imdbID).subscribe((data: any) => {
            console.log(data);
        });
    }
}
