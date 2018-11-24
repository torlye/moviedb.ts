import {MovieRelease} from './MovieRelease';

class File extends MovieRelease
{
    get format() {
        return "File";
    }
}

export default File;