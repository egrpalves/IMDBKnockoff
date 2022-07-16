import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ServerService<T> {
    private serverUrl = 'http://www.omdbapi.com/?apikey=dfffb825&';

    constructor(private http: HttpClient) {}

    public getMovie(search: string): Observable<T> {
        return this.http.get<T>(`${this.serverUrl}s=${search}&type=movie`);
    }

    public getMovieDetails(id: number): Observable<T> {
        return this.http.get<T>(`${this.serverUrl}i=${id}`);
    }
}