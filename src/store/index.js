const STORAGE_KEY = 'BLOG';
const REGIST_LOGIN = 'REGIST_LOGIN';

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

export function registerUser({ email, password }, callback) {
  const json = window.localStorage.getItem(REGIST_LOGIN);
  const users = JSON.parse(json) || [];

  if (users.find(user => user.email === email) !== undefined) {
    callback({
      message: 'this email has been registed!',
    });
  } else {
    window.localStorage.setItem(REGIST_LOGIN, JSON.stringify(users.concat({
      email,
      password,
    })));
    callback(null, email);
  }
}

export function loginUser({ email, password }, callback) {
  const json = window.localStorage.getItem(REGIST_LOGIN);
  const users = JSON.parse(json) || [];
  if (users.findIndex(user => user.email === email && user.password === password) === -1) {
    callback({
      message: 'email and password not existed!',
    });
  } else {
    callback(null, email);
  }
}

export function add(article) {
  return fetchArticles().then((result) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(result.concat(article)));
    return result.concat(article);
  });
}

export function fetchPrivateArticles(id) {
  return fetchArticles().then(result => result.filter(v => v.ownerId === id));
}
