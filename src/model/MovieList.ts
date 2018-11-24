import { MovieRelease } from '.';
import { AbstractMovie } from './AbstractMovie';

export interface IMovieDB
{
    releases: IReleasesCollection
    movies: IMoviesCollection
}

export interface IReleasesCollection
{
    [key:number]: IRelease
}

export interface IMoviesCollection
{
    [key:number]: AbstractMovie
}

export interface IRelease
{
    id: number
    movieReleases: MovieRelease[]
}