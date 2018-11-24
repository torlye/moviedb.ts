import {Release} from './AbstractRelease';

class File extends Release
{
    get format() {
        return "File";
    }
}

export default File;