import {ICastCrew} from './CastCrew';

export abstract class AbstractMovie
{
    protected static isValidYear(year: number) : boolean
    {
        return !isNaN(year) && Number.isFinite(year) && Number.isInteger(year) && year > 1800 && year < 2100;
    }

    private static isValidRating(rating: number) : boolean
    {
        return !isNaN(rating) && Number.isFinite(rating) && rating > 0 && rating <= 10;
    }

    public id : number;
    public imdbUrl : string;
    public title:string;
    public title2:string;
    public imdbrating: number;
    public plotoutline: string;
    public tagline: string;
    public runtime: number;
    public country: string[];
    public language: string[];
    public genre: string[];
    public cast: ICastCrew[];
    public writer: ICastCrew[];
    public director: ICastCrew[];
    public type: string;

    public abstract get yearForDisplay() : string;
    //public abstract get typeForDisplay() : string;
    public get ratingForDisplay()
    {
        if (this.rating){
            return this.rating.toFixed(1);
        }
        return "";
    }

    public get year() : number
    {
        return this.yearPrivate;
    }

    public set year(newValue: number)
    {
        if (AbstractMovie.isValidYear(newValue))
        {
            this.yearPrivate = newValue;
        }
    }

    public get year2() : number
    {
        return this.year2Private;
    }

    public set year2(newValue: number)
    {
        if (AbstractMovie.isValidYear(newValue))
        {
            this.year2Private = newValue;
        }
    }

    public get rating() : number
    {
        return this.ratingPrivate;
    }

    public set rating(newValue: number)
    {
        if (AbstractMovie.isValidRating(newValue))
        {
            this.ratingPrivate = newValue;
        }
    }


    private yearPrivate: number;
    private year2Private: number;
    private ratingPrivate: number;
}
