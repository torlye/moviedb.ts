import { IMoviesCollection } from '../model/MovieList';
import { MoviesAction } from '../actions/moviesActions';
import { ADD_MOVIE } from '../actions/actionTypes';
import { getMovieByImdbUrl } from 'src/selectors';
import * as loghelper from 'src/loghelper';

const initialState: IMoviesCollection = [];

export default function movies(state = initialState, action: MoviesAction) {
    switch (action.type) {
        case ADD_MOVIE: {
            const existingEntry = getMovieByImdbUrl(state, action.payload.imdbUrl)
            if (existingEntry) {
                loghelper.log("Duplicate movie "+action.payload.title+" "+action.payload.imdbUrl, loghelper.LOG_WARN);
                return state;
            }
            
            return [...state, action.payload] /*{
                ...state,
                [action.payload.id]: action.payload
            }*/
        }
        default:
            return state;
    }
}