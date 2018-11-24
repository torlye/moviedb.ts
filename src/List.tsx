import * as React from 'react';
import ListItem from './ListItem';
import * as Model from './model/Model';

export interface IListProps {
    list: Model.MovieRelease[]
  }

class List extends React.Component<IListProps> {
    public render() {
        const listItems = this.props.list.map((value, index, array) =>
            <ListItem key={value.Release.jmoviedbId} item={value}>{value}</ListItem>
            );

        return (
            <ul>{listItems}</ul>
        );
    }
}

export default List;