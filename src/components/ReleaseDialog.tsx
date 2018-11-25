import * as React from 'react';
import { IListItemProps } from './ListItem';
import { Dialog, DialogTitle, DialogContent, FormControl, InputLabel, Select, MenuItem, Input, TextField } from '@material-ui/core';
import * as Model from '../model';
import store from 'src/store';
import { getValidVideoFormats } from 'src/selectors';

export interface IReleaseDialogProps
{
    isOpen: boolean,
    release: Model.MovieRelease
    movie: Model.AbstractMovie
    enumVideoFormats?: string[]
    enumContainerFormats?: string[]
    enumFormatTypes?: string[]
}

class ReleaseDialog extends React.Component<IReleaseDialogProps>
{
    public render() {
        const {isOpen, movie, release, enumVideoFormats, enumContainerFormats, enumFormatTypes} = this.props;
        return (
            <Dialog fullScreen={true} open={isOpen}>
                <DialogTitle>{movie.title+" ("+movie.yearForDisplay+")"}</DialogTitle>
                <DialogContent>
                    <FormControl>
                        <InputLabel htmlFor="formatType">Format</InputLabel>
                        <Select value={release.format} input={<Input id="formatType" />}>
                            {enumFormatTypes!.map(name => (
                                <MenuItem key={name} value={name}>
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <div>
                        <InputLabel htmlFor="containerFormat">Container format</InputLabel>
                        <Select multiple={true} value={release.containerformat} input={<Input id="containerFormat" />}>
                            {enumContainerFormats!.map(name => (
                                <MenuItem key={name} value={name}>
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                        </div>
                    </FormControl>
                    <FormControl>
                        <div>
                        <InputLabel htmlFor="videoformat">Video format</InputLabel>
                        <Select multiple={true} value={release.video} input={<Input id="videoformat" />}>
                            {enumVideoFormats!.map(name => (
                                <MenuItem key={name} value={name}>
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                        </div>
                    </FormControl>
                </DialogContent>
            </Dialog>
        );
    }
}

export default ReleaseDialog;