import ReleaseDialog, { IReleaseDialogProps } from '../components/ReleaseDialog';
import { connect } from 'react-redux';
import * as Model from '../model';
import { getValidVideoFormats } from '../selectors';

function mapStateToProps(state: Model.IMovieDB, ownProps: IReleaseDialogProps) {
    return {
        enumVideoFormats: getValidVideoFormats(state),
        enumContainerFormats: state.enums.containerFormats,
        enumFormatTypes: state.enums.formatTypes
    };
}

export default connect(mapStateToProps)(ReleaseDialog);