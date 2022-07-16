export interface Movie {
    Title: string;
    Year: string;
    imdbID: string;
    Poster: string;
}

export interface MovieDetails extends Movie {
    Actors: string;
    Awards: string;
    BoxOffice: string;
    Country: string;
    DVD: string;
    Director: string;
    Genre: string;
    Language: string;
    Metascore: string;
    Plot: string;
    Production: string;
    Rated: string;
    Ratings: Rating[];
    Released: string;
    Response: string;
    Runtime: string;
    Type: string;
    Website: string;
    Writer: string;
    imdbRating: string;
    imdbVotes: string;
}

export interface Rating {
    Source: string;
    Value: string;
}
