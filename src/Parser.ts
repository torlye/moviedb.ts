import * as Model from './model';
import * as loghelper from './loghelper';

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
    country, language, genre, directors, writers, actors, audio, subtitles, notes] = entry;

    const movie = getMovie(type, id, imdbid, title, altTitle, rating, plot, tagline, runtime, year, year2);

    //const movie: Model.AbstractMovie|null = getMovie(type);
    if (movie != null)
    {
        movie.country = csvToArray(country);
        movie.language = csvToArray(language);
        movie.genre = csvToArray(genre);
        movie.director = getCastCrew(directors);
        movie.writer = getCastCrew(writers);
        movie.cast = getCastCrew(actors);
    }

    const release: Model.MovieRelease|null = getReleaseFromFormat(format, {
        id: parseInt(id, 10),
        movieId: -1,
        seen: seen === 'true',
        dvdregion
    });
    if (release != null)
    {
        //release.id = parseInt(id, 10);
        //release.seen = seen === "true";
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
        release.notes = notes;
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

function getMovie(type: string, id: string, imdbid: string, title: string, altTitle: string, 
    rating: string, plot: string, tagline: string, runtime: string, year: string, year2: string) {
    
        let movie: Model.AbstractMovie;

    if (type === "Film" || type === "TV Movie" || type === "Direct-to-video movie") {
        movie = new Model.Film(parseInt(id, 10), imdbid, title, altTitle, parseFloat(rating), plot, tagline, parseInt(runtime, 10), type, parseInt(year, 10), parseInt(year2, 10));
    }
    else if (type === "TV series" || type === "TV miniseries" || type === "Movie Serial" || type === "Web series") {
        movie = new Model.Series(parseInt(id, 10), imdbid, title, altTitle, parseFloat(rating), plot, tagline, parseInt(runtime, 10), type, parseInt(year, 10), parseInt(year2, 10));
    }
    else {
        loghelper.log("Invalid type " + type, loghelper.LOG_WARN);
        return null;
    }

    return movie;
}

function getReleaseFromFormat(format: string, p: {
    id: number,
    movieId: number,
    seen: boolean,
    dvdregion: string
}) : Model.MovieRelease|null
{
    let release: Model.MovieRelease;
    if (format === "DVD"||format === "Blu-ray"||format==="Blu-ray 3D")
    {
        const dvdRelease = new Model.DVDRelease(p.id, p.movieId, p.seen);
        dvdRelease.regionCode = parseRegionCode(p.dvdregion);
        
        release = dvdRelease;
    }
    else
    {
        release = new Model.MovieRelease(p.id, p.movieId, p.seen);
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
            loghelper.log(jsonString + "\n" + err, loghelper.LOG_ERROR);
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
            loghelper.log(jsonString + "\n" + err, loghelper.LOG_ERROR);
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
            loghelper.log(jsonString + "\n" + err, loghelper.LOG_ERROR);
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