import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie } from '../interfaces/movie';

@Component({
    selector: 'favorite-card',
    templateUrl: './favorite-card.component.html',
    styleUrls: ['./favorite-card.component.scss'],
})
export class FavoriteCardComponent implements OnInit {
    private _movie: Movie = {
        Title: '',
        Year: '',
        imdbID: '',
        Poster: '',
    };

    @Input()
    public set movie(movie: Movie) {
        this._movie = movie;
    }

    public get movie(): Movie {
        return this._movie;
    }

    @Output()
    removeFavoriteEvent = new EventEmitter<Movie>();

    removeFavorite(movie: Movie) {
        this.removeFavoriteEvent.emit(movie);
    }

    constructor() {}

    ngOnInit(): void {}
}
