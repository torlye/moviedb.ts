import * as React from 'react';
import * as Model from '../model';

export interface IListItemProps {
    release: Model.IRelease,
    movie?: Model.AbstractMovie,
    key: number,
    key2: number
}

class ListItem extends React.Component<IListItemProps> {
    public render() {
        const release = this.props.release.movieReleases[0];
        const movie = this.props.movie;
        if (!movie) {
            throw new Error("Missing movie");
        }

        return (
            <li key={this.props.key2}>
              <div><h1>{movie.title+" ("+movie.yearForDisplay+")"}</h1></div>
              <div>{movie.title2}</div>
              
              <div><h2>Movie info</h2></div>
              <div>Genre: {movie.genre.join("/")}</div>
              <div>Country: {movie.country.join(", ")}</div>
              <div>Language: {movie.language.join(", ")}</div>
              <div>{movie.runtime}m</div>
              <div>{movie.ratingForDisplay}</div>
              <div>{movie.imdbUrl}</div>
              <div>Seen: {release.seen+""}</div>
              
              <div>{movie.tagline}</div>
              <div>{movie.plotoutline}</div>
              
              <div>Directed by: {movie.director.map(p=> p.name).join(", ")}</div>
              <div>Written by: {movie.writer.map(p=> p.name).join(", ")}</div>
              <div>Cast: {movie.cast.map(p=> p.name+" as "+p.role).join(", ")}</div>
              
              <div><h2>Release info</h2></div>
              <div>{release.version}</div>
              <div>{release.completeness}</div>
              <div>Format: {release.format}</div>
              <div>{release.containerformat}</div>
              <div>{release.storageMedia}</div>
              <div>{(release instanceof Model.DVDRelease) ? (release as Model.DVDRelease).regionCode.join(",") : ""}</div>
              <div></div>
              <div>Location: {release.location}</div>
              <div>Pirated: {release.pirated+" "+release.scenerelease}</div>
              <div><h3>Video</h3></div>
              <div>{release.video}, {release.resolution}, {release.color}, {release.aspect}, {release.tvsystem}</div>
              <div><h3>Audio</h3></div>
              <div>{release.audioTracks.map(value => (value.language+ " ("+value.format +" "+value.channels+ " "+value.type+")")).join(", ")}</div>
              <div><h3>Subtitles</h3></div>
              <div>{release.subtitleTracks.map(value => value.language+" ("+value.format +" "+value.type+")").join(", ")}</div>
              <div>{release.notes}</div>
            </li>
        );
    }
}

export default ListItem;