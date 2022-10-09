const storage = {
  write: (key: string, value: string) => {
    return localStorage.setItem(key, value);
  },
  read: (key: string) => {
    return localStorage.getItem(key);
  },
  delete: (key: string) => {
    return localStorage.removeItem(key);
  },
  drop: () => {
    return localStorage.clear();
  },
};

// ! Current Storage Keys
/*
runWizard
cadDir
*/
let appStorage = localStorage;
