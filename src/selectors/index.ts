import { IMovieDB } from '../model';

export function getMovies(store: IMovieDB) {
    return store.movies;
}

export function getReleases(store: IMovieDB) {
    return store.releases;
}

export function getMovieById(store: IMovieDB, id: number) {
    return getMovies(store)[id];
}