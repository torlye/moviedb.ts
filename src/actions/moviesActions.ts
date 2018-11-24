import { ADD_MOVIE } from './actionTypes';
import { AbstractMovie } from '../model';

export interface IAddMovie {
    type: ADD_MOVIE,
    payload: AbstractMovie
}

export type MoviesAction = IAddMovie;

export function addMovie(content: AbstractMovie): IAddMovie {
    return {
        type: ADD_MOVIE,
        payload: content
    };
}
