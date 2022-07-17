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

    constructor(
        public server: ServerService<Movie[]>,
        public storage: StorageService,
        private router: Router
    ) {
        this.favorites = this.storage.retrieve('favorites') || [];
        this.watchedMovies = this.storage.retrieve('watchedMovies') || [];
        this.searchDetails = this.storage.retrieve('search') || [];
        this.searchValue = this.storage.retrieve('searchValue') || '';
    }

    ngOnInit(): void {}

    search(searchValue: string): void {
        let imdbIdRegex = /^tt\d+$/;

        if (imdbIdRegex.test(searchValue)) {
            this.router.navigate(['/movies', searchValue]);
        } else {
            this.server.getMovie(searchValue).subscribe((data: any) => {
                if (data.Response === 'True') {
                    this.searchDetails = data.Search;
                    this.searchDetails.forEach((item) => {
                        item.Favorite = this.favorites.some((fav) => fav.imdbID === item.imdbID);
                        item.Watched = this.watchedMovies.some((fav) => fav.imdbID === item.imdbID);
                    });
                } else {
                    this.searchErrorMessage = 'MOVIES.NO_RESULTS';
                    this.searchDetails = [];
                }

                this.storage.store('search', this.searchDetails);
                this.storage.store('searchValue', searchValue);
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
    movieDetails(event: any, movie: Movie): void {
        if (event.srcElement.classList[0] !== 'btn') {
            this.router.navigate(['/movies', movie.imdbID]);
        }
    }
    //#endregion Movie Details
}
