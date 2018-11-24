import List, { IListProps } from '../components/List';
import { getReleases } from '../selectors';
import { connect } from 'react-redux';
import * as Model from '../model';

function mapStateToProps(state: Model.IMovieDB): IListProps {
    const releases = getReleases(state);
    return { releases };
}

export default connect(mapStateToProps)(List);