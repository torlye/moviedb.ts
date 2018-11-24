import { IMoviesCollection } from '../model/MovieList';
import { MoviesAction } from '../actions/moviesActions';
import { ADD_MOVIE } from '../actions/actionTypes';

const initialState: IMoviesCollection = {};

export default function movies(state = initialState, action: MoviesAction) {
    switch (action.type) {
      case ADD_MOVIE: {
          return {
              ...state,
              [action.payload.id]: action.payload
          }
      }
      default:
        return state;
    }
}