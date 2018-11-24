import * as React from 'react';
import ListItem from '../containers/ListItem';
import * as Model from '../model';

export interface IListProps {
    releases?: Model.IReleasesCollection
}

class List extends React.Component<IListProps> {
    public render() {
        const releases = this.props.releases;
        if (!releases) {
            throw new Error("No releases");
        }

        const listItems = Object.keys(releases).map((key) => {
            const entry : Model.IRelease = releases[key];
            return <ListItem 
                key={entry.id} key2={entry.id} release={entry} />
        });

        return (
            <ul>{listItems}</ul>
        );
    }
}

export default List;