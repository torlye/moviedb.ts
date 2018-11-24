import * as React from 'react';
import './App.css';
import * as GAPI from './GAPI/gapi';
import List from './List';
import * as Parser from './Parser';
import {MovieRelease} from './model/MovieRelease';

//declare var window: IMyWindow;

interface IState {
  listData: MovieRelease[];
}

class App extends React.Component<any, IState> {
  public constructor(props: any) {
     super(props);
     this.state = { listData: [] };
  }

  public render() {
    return (
      <div className="App">
        {/*<header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>*/}
        <div>
          <button id="authorize_button">Authorize</button>
          {/*<button id="signout_button">Sign Out</button>*/}
          <pre id="content"/>
        </div>
        <div>
          <List list={this.state.listData} />
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
    this.setState({
      listData: Parser.default(data)
    })
  }
}

export default App;