import { MovieRelease } from '.';
import { AbstractMovie } from './AbstractMovie';

export interface IMovieDB
{
    releases: IReleasesCollection,
    movies: IMoviesCollection,
    enums: IEnums
}

export type IReleasesCollection = IRelease[];
export type IMoviesCollection = AbstractMovie[];

export interface IRelease
{
    id: number,
    title?: string,
    movieReleases: MovieRelease[]
}

export interface IEnums {
    formatTypes: string[],
    containerFormats: string[],
    videoFormats: string[],
}