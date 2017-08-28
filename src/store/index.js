const STORAGE_KEY = 'BLOG';
export function fetchArticles() {
  return new Promise((resolve) => {
    // localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    const json = window.localStorage.getItem(STORAGE_KEY);
    setTimeout(() => {
      if (json !== null) resolve(JSON.parse(json));
      else resolve([]);
    }, 2000);
  });
}
export function receiveArticles() {
  
}
