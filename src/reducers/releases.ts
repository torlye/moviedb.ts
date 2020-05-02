import { IRelease } from "../model";
import { ADD_RELEASE, ADD_RELEASES } from '../actions/actionTypes';
import { ReleasesAction } from '../actions/releasesActions';
import { IReleasesCollection } from '../model/MovieList';
import * as loghelper from '../loghelper';

const initialState: IReleasesCollection = [];

export default function releases(state = initialState, action: ReleasesAction) {
    loghelper.log(action.type + " " + JSON.stringify(action.payload), loghelper.LOG_DEBUG);
    switch (action.type) {
      case ADD_RELEASE: {
          return [...state, action.payload]/*{
              ...state,
              [action.payload.id]: action.payload
          }*/
      }
      case ADD_RELEASES: {
        return [...state, ...action.payload]/*{
            ...state,
            [action.payload.id]: action.payload
        }*/
    }
      default:
        return state;
    }
}