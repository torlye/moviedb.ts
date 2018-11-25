import { combineReducers } from "redux";
import releases from './releases';
import movies from './movies';
import enums from './enums';

export default combineReducers({ releases, movies, enums });