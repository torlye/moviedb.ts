import AbstractSeries from './AbstractSeries';

class TVSeries extends AbstractSeries
{
    public get typeForDisplay(): string
    {
        return "TV-series";
    }
}

export default TVSeries;