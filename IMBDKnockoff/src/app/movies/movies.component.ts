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
        this.searchDetails = this.storage.retrieve('search') || [];
        this.searchValue = this.storage.retrieve('searchValue') || '';
    }

    ngOnInit(): void {}

    public search(searchValue: string): void {
        let imdbIdRegex = /^tt\d+$/;

        if (imdbIdRegex.test(searchValue)) {
            this.router.navigate(['/movies', searchValue]);
        } else {
            this.server.getMovie(searchValue).subscribe((data: any) => {
                if (data.Response === 'True') {
                    this.searchDetails = data.Search;
                    this.searchDetails.forEach((item) => {
                        item.Favorite = this.favorites.some((fav) => fav.imdbID === item.imdbID);
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

    public addRemoveFavorite(movie: Movie): void {
        if (this.favorites.some((item) => item.imdbID === movie.imdbID)) {
            this.removeFavorite(movie);
        } else {
            this.favorites.push(movie);
            movie.Favorite = true;

            this.storage.store('search', this.searchDetails);
            this.storage.store('favorites', this.favorites);
        }
    }

    public movieDetails(event: any, movie: Movie): void {
        if (event.srcElement.classList[0] !== 'btn') {
            this.router.navigate(['/movies', movie.imdbID]);
        }
    }

    removeFavorite(movie: any): void {
        this.favorites = this.favorites.filter((item) => item.imdbID !== movie.imdbID);
        movie.Favorite = false;

        this.storage.store('search', this.searchDetails);
        this.storage.store('favorites', this.favorites);
    }
}
