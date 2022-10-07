const storage = {
  write: (key: string, value: string) => {
    return localStorage.setItem(key, value);
  },
  read: (key: string) => {
    return localStorage.getItem(key);
  },
};

// ! Current Storage Keys
/*
runWizard
 
*/
