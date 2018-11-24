import { IAudioTrack, ISubtitleTrack } from './AudioSub';

export class MovieRelease
{
    public format: string;
    
    public get video(): string[]
    {
        return this.videoPrivate
    }

    public set video(newValue)
    {
        this.videoPrivate = newValue;
    }

    public id : number;
    public movieId : number;
    public seen: boolean;
    public pirated: boolean;
    public color: string;
    public resolution: string[];
    public tvsystem: string[];
    public scenerelease: string;
    public aspect: string[];
    public containerformat: string[];
    public aspectratio: string[];
    public location: string;
    public storageMedia: string[];
    public audioTracks: IAudioTrack[];
    public subtitleTracks: ISubtitleTrack[];
    public notes: string;
    public version: string;
    public completeness: string;
    private videoPrivate: string[];
}
