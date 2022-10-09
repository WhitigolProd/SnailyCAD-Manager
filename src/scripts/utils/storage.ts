// ! Current Storage Keys
type storageKeys = "wizardComplete" | "cadDir";

// * Storage Class
const storeClass = class {
  key = "";
  constructor(key: string) {
    this.key = key;
  }
  read() {
    return localStorage.getItem(this.key);
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
