import {ICastCrew} from './CastCrew';

export abstract class AbstractMovie
{
    public static isValidYear(year?: number) : boolean
    {
        return year != undefined && year != null && !isNaN(year) && Number.isFinite(year) && Number.isInteger(year) && year > 1800 && year < 2100;
    }

    public static isValidRating(rating: number) : boolean
    {
        return rating != undefined && rating != null && !isNaN(rating) && Number.isFinite(rating) && rating > 0 && rating <= 10;
    }

    public id : number;
    public imdbUrl : string;
    public title:string;
    public title2:string;
    public imdbrating?: number;
    public plotoutline: string;
    public tagline: string;
    public runtime: number;
    public country?: string[];
    public language?: string[];
    public genre?: string[];
    public cast?: ICastCrew[];
    public writer?: ICastCrew[];
    public director?: ICastCrew[];
    public type: string;
    public year?: number;
    public year2?: number;

    public constructor(id: number, imdbUrl: string, title: string, title2: string, imdbrating: number, plotoutline:string,
        tagline:string, runtime:number, type:string, year:number, year2: number) {
        this.id = id;
        this.imdbUrl = imdbUrl;
        this.title = title;
        this.title2 = title2;
        if (AbstractMovie.isValidRating(imdbrating)) {
            this.imdbrating = imdbrating;
        }
        this.plotoutline = plotoutline;
        this.tagline = tagline;
        this.runtime = runtime;
        this.type = type;
        if (AbstractMovie.isValidYear(year)) {
            this.year = year;
        }
        if (AbstractMovie.isValidYear(year2)) {
            this.year2 = year2;
        }
    }

    public abstract get yearForDisplay() : string;
    
    public get ratingForDisplay()
    {
        if (this.imdbrating){
            return this.imdbrating.toFixed(1);
        }
        return "";
    }
}
