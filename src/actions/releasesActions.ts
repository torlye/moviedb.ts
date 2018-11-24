import { ADD_RELEASE } from './actionTypes';
import { IRelease } from '../model';

export interface IAddRelease {
    type: ADD_RELEASE,
    payload: IRelease
}

export type ReleasesAction = IAddRelease;

export function addRelease(content: IRelease): IAddRelease {
    return {
        type: ADD_RELEASE,
        payload: content
    };
}
