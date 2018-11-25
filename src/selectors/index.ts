import { IMovieDB } from '../model';
import { IMoviesCollection } from 'src/model/MovieList';

export function getMovies(store: IMovieDB) {
    return store.movies;
}

export function getReleases(store: IMovieDB) {
    return store.releases;
}

export function getMovieById(store: IMovieDB, id: number) {
    return getMovies(store).filter(value => value.id === id)[0];
}

export function getMovieByImdbUrl(store: IMoviesCollection, imdbUrl: string) {
    if (!imdbUrl) {
        return null;
    }

    const movies = store.filter(value => {
        return value.imdbUrl && value.imdbUrl === imdbUrl;
    });

    if (movies.length > 1) {
        throw new Error("Duplicate movies "+movies[0].title+" "+movies[0].imdbUrl);
    }

    if (movies.length === 1) {
        return movies[0];
    }
    return null;
}

export function getValidVideoFormats(store: IMovieDB){
    return store.enums.videoFormats;
}