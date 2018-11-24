import * as Model from './model';

interface IParsedJmoviedbEntry {
    movie: Model.AbstractMovie,
    release: Model.IRelease
}

function parseSpreadsheetList(list: string[][]) : IParsedJmoviedbEntry[]
{
    const parsedEntries: IParsedJmoviedbEntry[] = []
    
    for(const entry of list)
    {
        const parsed = parseSpreadsheetEntry(entry);
        if (parsed != null)
        {
            parsedEntries.push(parsed);
        }
    }
    return parsedEntries;
}


function parseSpreadsheetEntry(entry: string[]) : IParsedJmoviedbEntry|null
{
    //const type = entry[1]
    const [id, type, imdbid, title, altTitle, year, rating, plot, tagline, 
    color, runtime, version, unofficial, seen, location, format,
    disc, video, dvdregion, tvsystem, scenerelease, videoresolution, videoaspect, container, completeness, year2,
    country, language, genre, directors, writers, actors, audio, subtitles] = entry;

    const movie: Model.AbstractMovie|null = getMovieFromType(type);
    if (movie != null)
    {
        movie.id = parseInt(id, 10);
        movie.imdbUrl = imdbid;
        movie.title = title;
        movie.year = parseInt(year, 10);
        movie.rating = parseFloat(rating);
        movie.year2 = parseInt(year2, 10);
        movie.title2 = altTitle;
        movie.runtime = parseInt(runtime, 10);
        movie.tagline = tagline;
        movie.plotoutline = plot;
        movie.country = csvToArray(country);
        movie.language = csvToArray(language);
        movie.genre = csvToArray(genre);
        movie.director = getCastCrew(directors);
        movie.writer = getCastCrew(writers);
        movie.cast = getCastCrew(actors);
    }

    const release: Model.MovieRelease|null = getReleaseFromFormat(format, dvdregion);
    if (release != null)
    {
        release.id = parseInt(id, 10);
        release.seen = seen === "true";
        release.pirated = unofficial === "true";
        release.color = color;
        release.resolution = [videoresolution];
        release.scenerelease = scenerelease;
        release.tvsystem = [tvsystem];
        release.containerformat = [container];
        release.aspectratio = [videoaspect];
        release.video = [video];
        release.location = location;
        release.storageMedia = [disc];
        release.audioTracks = getAudioTracks(audio);
        release.subtitleTracks = getSubtitleTracks(subtitles);
        release.version = version;
        release.completeness = completeness;
    }

    if (movie != null && release != null) {
        return {
            movie, 
            release: {
                id: release.id,
                movieReleases: [ release ]
            }
        };
    }
    return null;
}

function getMovieFromType(type: string) : Model.AbstractMovie|null
{
    let movie: Model.AbstractMovie;

    if (type === "Film" || type === "TV Movie" || type === "Direct-to-video movie")
    {
        movie = new Model.Film();
    }
    else if (type === "TV series" || type === "TV miniseries" || type === "Movie Serial" || type === "Web series")
    {
        movie = new Model.AbstractSeries();
    }
    else
    {
        console.error("Invalid type "+type);
        return null;
    }

    movie.type = type;
    return movie;
}

function getReleaseFromFormat(format: string, dvdregion: string) : Model.MovieRelease|null
{
    let release: Model.MovieRelease;
    if (format === "DVD"||format === "Blu-ray"||format==="Blu-ray 3D")
    {
        const dvdRelease = new Model.DVDRelease();
        dvdRelease.regionCode = parseRegionCode(dvdregion);
        
        release = dvdRelease;
    }
    else
    {
        release = new Model.MovieRelease();
    }
    release.format = format;
    
    return release;
}

function parseRegionCode(dvdregion: string): string[] {
    const codes:string[] = [];
    if (dvdregion) {
        for (const code of csvToArray(dvdregion)) {
            codes.push(code);
        }
    }
    return codes;
}

function csvToArray(csvString: string) : string[] {
    if (!csvString) {
        return [];
    }

    const entries = csvString.split(",");
    const trimmedValues = entries.map((val) => val.trim());
    return trimmedValues;
}

function getCastCrew(jsonString: string) : Model.ICastCrew[]
{
    const castCrew: Model.ICastCrew[] = [];

    if (jsonString && jsonString.length > 0)
    {
        try
        {
            const obj = JSON.parse(jsonString) as IPerson[];
            obj.forEach(element => {
                const cc = {} as Model.ICastCrew;
                cc.imdbId = element.id;
                cc.name = element.name
                if (element.character) {
                    cc.role = element.character
                }
                castCrew.push(cc);
            });
        }
        catch (err)
        {
            console.error(jsonString + "\n" + err);
        }
    }

    return castCrew;
}

function getAudioTracks(jsonString: string) : Model.IAudioTrack[]
{
    const tracks: Model.IAudioTrack[] = [];

    if (jsonString && jsonString.length > 0)
    {
        try
        {
            const obj = JSON.parse(jsonString) as Model.IAudioTrack[];
            obj.forEach(element => {
                tracks.push(element);
            });
        }
        catch (err)
        {
            alert(jsonString);
            console.error(jsonString + "\n" + err);
        }
    }

    return tracks;
}

function getSubtitleTracks(jsonString: string) : Model.ISubtitleTrack[]
{
    const tracks: Model.ISubtitleTrack[] = [];

    if (jsonString && jsonString.length > 0)
    {
        try
        {
            const obj = JSON.parse(jsonString) as Model.ISubtitleTrack[];
            obj.forEach(element => {
                tracks.push(element);
            });
        }
        catch (err)
        {
            alert(jsonString);
            console.error(jsonString + "\n" + err);
        }
    }

    return tracks;
}

interface IPerson
{
    name: string,
    id:string
    character:string
}

export default parseSpreadsheetList;