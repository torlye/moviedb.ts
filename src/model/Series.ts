import {AbstractMovie} from './AbstractMovie';

class Series extends AbstractMovie
{
    public get yearForDisplay() : string
    {
        if (AbstractMovie.isValidYear(this.year) && AbstractMovie.isValidYear(this.year2))
        {
            if (this.year! === this.year2!) {
                return this.year!.toString();
            }
            return this.year! + '\u2013' + this.year2!;
        }
        if (AbstractMovie.isValidYear(this.year))
        {
            return this.year! + '\u2013';
        }
        return "";
    }
}

export default Series;