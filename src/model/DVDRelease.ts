import {MovieRelease} from './MovieRelease';

class DVDRelease extends MovieRelease
{
    constructor(id: number, movieId: number, seen: boolean) {
        super(id, movieId, seen);
    }

    public regionCode?: string[];
}

export default DVDRelease;