import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import App, { IAppProps } from '../components/App';
import * as actions from '../actions';
import { AbstractMovie, IRelease } from '../model';
import { IAddMovie } from '../actions/moviesActions';
import { IAddRelease, IAddReleases } from '../actions/releasesActions';

export function mapDispatchToProps(dispatch: Dispatch<IAddMovie|IAddRelease|IAddReleases>): IAppProps {
    return {
        onAddMovie: (content: AbstractMovie) => dispatch(actions.addMovie(content)),
        onAddRelease: (content: IRelease[]) => dispatch(actions.addReleases(content)),
    }
}

export default connect(null, mapDispatchToProps)(App);