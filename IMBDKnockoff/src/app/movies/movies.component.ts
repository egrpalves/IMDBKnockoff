import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../interfaces/movie';
import { ServerService } from '../services/server.service';
import { StorageService } from '../services/storage.service';

@Component({
    selector: 'app-movies',
    templateUrl: './movies.component.html',
    styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
    searchDetails: Movie[];
    favorites: Movie[];
    watchedMovies: Movie[];
    searchValue: string;
    displayedColumns: string[] = ['title', 'year', 'commands'];
    searchErrorMessage: string = '';
    favoriteIcon = 'favorite_border';
    suggestedIds = ['tt1201607', 'tt0076759', 'tt1490017'];
    suggestedMovies: Movie[] = [];

    constructor(
        public server: ServerService,
        public storage: StorageService,
        private router: Router
    ) {
        this.favorites = this.storage.retrieve('favorites') || [];
        this.watchedMovies = this.storage.retrieve('watchedMovies') || [];
        this.searchDetails = this.storage.retrieve('search') || [];
        this.searchValue = this.storage.retrieve('searchValue') || '';
    }

    ngOnInit(): void {
        this.suggestedIds.forEach((id) => {
            this.server.getMovieDetails(id).subscribe({
                next: (result: any) => {
                    result.Favorite = this.favorites.some((fav) => fav.imdbID === result.imdbID);
                    result.Watched = this.watchedMovies.some((wat) => wat.imdbID === result.imdbID);
                    this.suggestedMovies.push(result);
                },
                error: (error: any) => this.server.error(),
            });
        });
    }

    search(searchValue: string): void {
        let imdbIdRegex = /^tt\d+$/;

        if (imdbIdRegex.test(searchValue)) {
            this.router.navigate(['/movies', searchValue]);
        } else {
            this.server.getMovie(searchValue.trim()).subscribe({
                next: (data: any) => {
                    if (data.Response === 'True') {
                        this.searchDetails = data.Search;
                        this.searchDetails.forEach((item) => {
                            item.Favorite = this.favorites.some(
                                (fav) => fav.imdbID === item.imdbID
                            );
                            item.Watched = this.watchedMovies.some(
                                (wat) => wat.imdbID === item.imdbID
                            );
                        });
                    } else if (searchValue.trim() !== '') {
                        this.searchErrorMessage = 'MOVIES.NO_RESULTS';
                        this.searchDetails = [];
                    } else {
                        this.searchDetails = [];
                        this.searchErrorMessage = '';
                    }

                    this.storage.store('search', this.searchDetails);
                    this.storage.store('searchValue', searchValue);
                },
                error: (error: any) => this.server.error(),
            });
        }
    }

    //#region Favorites

    toggleFavorite(movie: Movie): void {
        if (this.favorites.some((item) => item.imdbID === movie.imdbID)) {
            this.removeFavorite(movie);
        } else {
            movie.Favorite = true;
            this.favorites.push(movie);

            this.storage.store('search', this.searchDetails);
            this.storage.store('favorites', this.favorites);
        }
    }

    removeFavorite(movie: Movie): void {
        movie.Favorite = false;
        this.favorites = this.favorites.filter((item) => item.imdbID !== movie.imdbID);

        this.storage.store('search', this.searchDetails);
        this.storage.store('favorites', this.favorites);
    }

    //#endregion Favorites

    //#region Watched

    removeWatched(movie: Movie): void {
        movie.Watched = false;
        this.watchedMovies = this.watchedMovies.filter((item) => item.imdbID !== movie.imdbID);

        this.storage.store('search', this.searchDetails);
        this.storage.store('watchedMovies', this.watchedMovies);
    }

    toggleWatched(movie: Movie): void {
        if (this.watchedMovies.some((item) => item.imdbID === movie.imdbID)) {
            this.removeWatched(movie);
        } else {
            movie.Watched = true;
            this.watchedMovies.push(movie);

            this.storage.store('search', this.searchDetails);
            this.storage.store('watchedMovies', this.watchedMovies);
        }
    }

    //#endregion Watched

    //#region Movie Details

    movieDetails(movie: Movie): void {
        this.router.navigate(['/movies', movie.imdbID]);
    }

    //#endregion Movie Details
}
