// ! Current Storage Keys
type storageKeys =
    | 'wizardComplete'
    | 'cadDir'
    | 'dismissedUpdate'
    | 'remotePort'
    | 'remotePassword'
    | 'remoteOnStart'
    | 'start-func'
    | 'wh_OnlineEnabled'
    | 'wh_OnlineTitle'
    | 'wh_OnlineDesc'
    | 'wh_OfflineEnabled'
    | 'wh_OfflineTitle'
    | 'wh_OfflineDesc'
    | 'wh_url';

// * Storage Class
const storeClass = class {
    key = '';
    constructor(key: string) {
        this.key = key;
    }
    read() {
        if (localStorage.getItem(this.key) == null) return null;
        const value: any = localStorage.getItem(this.key);
        return value;
    }
    write(value: string) {
        return localStorage.setItem(this.key, value);
    }
    delete() {
        return localStorage.removeItem(this.key);
    }
    drop() {
        return localStorage.clear();
    }
};

// * Create Storage Function
const storage = (key: storageKeys) => {
    return new storeClass(key);
};
