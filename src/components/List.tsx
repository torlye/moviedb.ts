import * as React from 'react';
import ListItem from '../containers/ListItem';
import * as Model from '../model';
import MList from '@material-ui/core/List';

export interface IListProps {
    releases?: Model.IReleasesCollection
}

class List extends React.Component<IListProps> {
    public render() {
        const releases = this.props.releases;
        if (!releases) {
            throw new Error("No releases");
        }

        const listItems = releases.map((value) => {
            return <ListItem 
                key={value.id} key2={value.id} release={value} />
        });
        /*const listItems = Object.keys(releases).map((key) => {
            const entry : Model.IRelease = releases[key];
            return <ListItem 
                key={entry.id} key2={entry.id} release={entry} />
        });*/

        return (
            <MList>{listItems}</MList>
        );
    }
}

export default List;