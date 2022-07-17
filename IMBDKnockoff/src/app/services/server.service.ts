import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Movie } from '../interfaces/movie';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root',
})
export class ServerService {
    private serverUrl = 'http://www.omdbapi.com/?apikey=dfffb825&';

    constructor(private http: HttpClient, private snackbar: MatSnackBar) {}

    getMovie(search: string): Observable<Movie[]> {
        return this.http.get<Movie[]>(`${this.serverUrl}s=${search}&type=movie`);
    }

    getMovieDetails(id: string): Observable<Movie> {
        return this.http.get<Movie>(`${this.serverUrl}i=${id}&plot=full`);
    }

    error(): void {
        this.snackbar.open('An error has occured', '', {
            duration: 3000,
        });
    }
}
