import * as React from 'react';
import './App.css';
import * as GAPI from '../GAPI/gapi';
import List from '../containers/List';
import * as Parser from '../Parser';
import { AbstractMovie, IRelease } from '../model';

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
            this.props.onAddMovie!(parsedValue.movie);
            this.props.onAddRelease!(parsedValue.release);
        });
    }
}

export default App;