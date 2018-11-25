import { ReleasesAction, IAddRelease } from 'src/actions/releasesActions';
import { ADD_RELEASE } from 'src/actions/actionTypes';
import { IEnums, IRelease } from 'src/model/MovieList';
import { MovieRelease } from 'src/model';

const initialState: IEnums = {
    containerFormats: [],
    videoFormats: [],
    formatTypes: []
}

export default function enums(state:IEnums = initialState, action: ReleasesAction) {
    switch (action.type) {
        case ADD_RELEASE: {
            registerNewFormats(state, "videoFormats", action.payload.movieReleases, (acc: string[], mr) => acc.concat(mr.video));
            registerNewFormats(state, "containerFormats", action.payload.movieReleases, (acc: string[], mr) => acc.concat(mr.containerformat));
            registerNewFormats(state, "formatTypes", action.payload.movieReleases, (acc: string[], mr) => acc.concat(mr.format));
            return state;
        }
        default:
            return state;
    }
}

export function registerNewFormats(state:any, propertyName:string, movieReleases: MovieRelease[], accumulator: (acc: string[],mr: MovieRelease) => string[])
{
    
    const existingValues: string[] = state[propertyName];
    const addedValues = movieReleases.reduce(accumulator, []);
    const newFormats = getUniqueValues(addedValues, existingValues);
    
    if (newFormats.length > 0) {
        state[propertyName] = [
            ...existingValues,
            ...newFormats
        ]
    }
    return state;
}

function getUniqueValues(addedValues: string[], currentValues: string[]): string[] {
    const uniqueValues: string[] = [];
    
    addedValues.forEach(v => {
        if (v && !currentValues.includes(v) && !uniqueValues.includes(v)) {
            uniqueValues.push(v);
        }
    });

    return uniqueValues;
}
