import {AbstractMovie} from './AbstractMovie';
import {Release} from './AbstractRelease';

class MovieRelease
{
    public readonly Movie: AbstractMovie;
    public readonly Release: Release;

    constructor(movie: AbstractMovie, release: Release)
    {
        this.Movie = movie;
        this.Release = release;
    }
}

export {MovieRelease, AbstractMovie, Release};