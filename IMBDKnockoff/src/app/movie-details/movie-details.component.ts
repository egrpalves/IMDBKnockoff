import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieDetails } from '../interfaces/movie-details';
import { ServerService } from '../services/server.service';

@Component({
    selector: 'app-movie-details',
    templateUrl: './movie-details.component.html',
    styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
    public movieDetails: MovieDetails = {};

    constructor(
        public server: ServerService<MovieDetails>,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));

        this.server.getMovieDetails(id).subscribe((data: any) => {
            this.movieDetails = data;
        });
    }
}
