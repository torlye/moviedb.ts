import { IAudioTrack, ISubtitleTrack } from './AudioSub';

export class MovieRelease
{
    constructor(id: number, movieId: number, seen: boolean) {
        this.id = id;
        this.movieId = movieId;
        this.seen = seen;
        this.resolution = [];
        this.tvsystem = [];
        this.aspect = [];
        this.containerformat = [];
        this.storageMedia = [];
        this.aspectratio = [];
        this.audioTracks = [];
        this.subtitleTracks = [];
        this.videoPrivate = [];
        this.secondaryFormats = [];
    }

    public format?: string;
    public secondaryFormats: string[];

    public get allFormats(): string[] {
        const formats = [...this.secondaryFormats];
        if (this.format)
            formats.push(this.format);
        return formats;
    }
    
    public get video(): string[]
    {
        return this.videoPrivate ?? [];
    }

    public set video(newValue)
    {
        this.videoPrivate = newValue;
    }

    public id : number;
    public movieId: number;
    public seen: boolean;
    public pirated?: boolean;
    public color?: string;
    public resolution: string[];
    public tvsystem: string[];
    public scenerelease?: string;
    public aspect: string[];
    public containerformat: string[];
    public aspectratio: string[];
    public location?: string;
    public storageMedia: string[];
    public audioTracks: IAudioTrack[];
    public subtitleTracks: ISubtitleTrack[];
    public notes?: string;
    public version?: string;
    public completeness?: string;
    private videoPrivate: string[];
}
