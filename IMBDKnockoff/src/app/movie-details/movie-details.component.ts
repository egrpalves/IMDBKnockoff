import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';
import { MovieDetails } from '../interfaces/movie';
import { ServerService } from '../services/server.service';

@Component({
    selector: 'app-movie-details',
    templateUrl: './movie-details.component.html',
    styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
    public movieDetails: MovieDetails = {
        Actors: '',
        Awards: '',
        BoxOffice: '',
        Country: '',
        DVD: '',
        Director: '',
        Genre: [],
        Language: '',
        Metascore: '',
        Plot: '',
        Poster: '',
        Production: '',
        Rated: '',
        Ratings: [],
        Released: '',
        Response: '',
        Runtime: '',
        Type: '',
        Website: '',
        Writer: '',
        imdbRating: '',
        imdbVotes: '',
        Title: '',
        Year: '',
        imdbID: '',
    };

    constructor(
        public server: ServerService<MovieDetails>,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id') ?? '';

        this.server.getMovieDetails(id).subscribe((data: any) => {
            data.Genre = data.Genre.split(',');
            this.movieDetails = data;
        });
    }
}
