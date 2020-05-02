import { ADD_RELEASE, ADD_RELEASES } from './actionTypes';
import { IRelease } from '../model';

export interface IAddRelease {
    type: ADD_RELEASE,
    payload: IRelease
}

export interface IAddReleases {
    type: ADD_RELEASES,
    payload: IRelease[]
}

export type ReleasesAction = IAddRelease | IAddReleases;

export function addRelease(content: IRelease): IAddRelease {
    return {
        type: ADD_RELEASE,
        payload: content
    };
}

export function addReleases(content: IRelease[]): IAddReleases {
    return {
        type: ADD_RELEASES,
        payload: content
    };
}