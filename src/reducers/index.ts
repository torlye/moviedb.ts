import { combineReducers } from "redux";
import releases from './releases';
import movies from './movies';

export default combineReducers({ releases, movies });