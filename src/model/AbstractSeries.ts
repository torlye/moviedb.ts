import {AbstractMovie} from './AbstractMovie';

class AbstractSeries extends AbstractMovie
{
    public get yearForDisplay() : string
    {
        if (AbstractMovie.isValidYear(this.year) && AbstractMovie.isValidYear(this.year2))
        {
            return this.year + '\u2013' + this.year2;
        }
        if (AbstractMovie.isValidYear(this.year))
        {
            return this.year.toString();
        }
        return "";
    }

    public completeness: string;
}

export default AbstractSeries;