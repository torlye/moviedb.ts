import {AbstractMovie} from './AbstractMovie';

class Film extends AbstractMovie
{
    public get typeForDisplay(): string {
        return "Film";
    }

    public get yearForDisplay() : string
    {
        if (AbstractMovie.isValidYear(this.year) && AbstractMovie.isValidYear(this.year2))
        {
            return this.year + "/" + this.year2;
        }
        if (AbstractMovie.isValidYear(this.year))
        {
            return this.year.toString();
        }
        return "";
    }
}

export default Film;