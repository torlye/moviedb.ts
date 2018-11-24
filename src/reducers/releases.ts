import { IRelease } from "../model";
import { ADD_RELEASE } from '../actions/actionTypes';
import { ReleasesAction } from '../actions/releasesActions';
import { IReleasesCollection } from '../model/MovieList';

const initialState: IReleasesCollection = {};

export default function releases(state = initialState, action: ReleasesAction) {
    switch (action.type) {
      case ADD_RELEASE: {
          return {
              ...state,
              [action.payload.id]: action.payload
          }
      }
      default:
        return state;
    }
}