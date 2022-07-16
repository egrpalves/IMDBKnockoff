import { Component, OnInit } from '@angular/core';
import { Movie } from '../interfaces/movie';
import { ServerService } from '../services/server.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
    public searchDetails: Movie[] = [];
    public favourites: Movie[] = [];
    public searchValue: string = '';
    public displayedColumns: string[] = ['title', 'year', 'commands'];

    constructor(public server: ServerService<Movie[]>) {}

    ngOnInit(): void {}

    public search(searchValue: string): void {
        this.server.getMovie(searchValue).subscribe((data: any) => {
            this.searchDetails = data.Search;
            console.log(this.searchDetails);
        });
    }

    public addRemoveFavourite(movie: Movie): void {
        if (this.favourites.includes(movie)) {
            this.favourites = this.favourites.filter((item) => item !== movie);
            return;
        }

        this.favourites.push(movie);
    }
}
