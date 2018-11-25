import * as React from 'react';
import './App.css';
import * as GAPI from '../GAPI/gapi';
import List from '../containers/List';
import * as Parser from '../Parser';
import { AbstractMovie, IRelease } from '../model';
import store from 'src/store';
import { getMovieById, getMovieByImdbUrl } from 'src/selectors';
import * as loghelper from 'src/loghelper';

export interface IAppProps
{
    onAddMovie?: (content: AbstractMovie) => void;
    onAddRelease?: (content: IRelease) => void;
}

class App extends React.Component<IAppProps> {
    public constructor(props:IAppProps) {
        super(props);
    }

    public render() {
        return (
            <div className="App">
                <div>
                    <button id="authorize_button">Authorize</button>
                    {/*<button id="signout_button">Sign Out</button>*/}
                    <pre id="content"/>
                </div>
                <div>
                    <List />
                </div>
            </div>
        );
    }

    public componentDidMount() {
        this.handleClientLoad();
    }

    private handleClientLoad() {
        console.log("handleClientLoad");
        GAPI.loadClient(this.callback, this);
    }

    private callback() {
        console.log("callback");
        GAPI.getRows(this.setData, this);
        console.log("done");
    }

    private setData(data: string[][]) {
        console.log("setData invoked");
        console.log("data loaded "+data.length);

        Parser.default(data).forEach(parsedValue => {
            const {release, movie} = parsedValue;
            const movieId = this.getOrAddMovie(movie);
            release.movieReleases[0].movieId = movieId
            this.props.onAddRelease!(release);
        });
    }

    private getOrAddMovie(movie:AbstractMovie) {
        if (movie.imdbUrl) {
            const existingMovie = getMovieByImdbUrl(store.getState().movies, movie.imdbUrl);
            if (existingMovie) {
                loghelper.log("Movie already exists in database "+movie.title+" "+movie.imdbUrl, loghelper.LOG_WARN);
                return existingMovie.id;
            }
        }

        this.props.onAddMovie!(movie);
        return movie.id;
    }
}

export default App;