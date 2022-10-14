const env = class {
    selector: string;

    constructor(selector: string) {
        this.selector = selector;
    }

    read() {
        if (storage('cadDir').read()) {
            let currentenv = require('dotenv').config({
                path: path.join(storage('cadDir').read(), '/.env'),
                encoding: 'utf8',
            });

            return currentenv.parsed;
        }
        toast.warning('ENV Error: NO_CAD_DIRECTORY');
        log('ENV Warning: NO_CAD_DIRECTORY', 'warning');
    }
};
