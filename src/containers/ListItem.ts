import ListItem, { IListItemProps } from '../components/ListItem';
import { connect } from 'react-redux';
import { getMovieById } from '../selectors';
import * as Model from '../model';

function mapStateToProps(state: Model.IMovieDB, ownProps: IListItemProps) {
    return {
        movie: getMovieById(state, ownProps.key2)
    };
}

export default connect(mapStateToProps)(ListItem);