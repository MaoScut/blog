const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

const articlePath = path.join(__dirname, 'article.json');
const accountPath = path.join(__dirname, 'account.json');
// function readAll(p) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(p, 'utf8', (err, data) => {
//       if (err) reject(err);
//       resolve(JSON.parse(data));
//     });
//   });
// }
// function writeAll(arr, p) {
//   return new Promise((resolve, reject) => {
//     fs.writeFile(p, JSON.stringify(arr, null, 2), (e) => {
//       if (e) reject(e);
//       resolve(arr);
//     });
//   });
// }

// // 文章
// function addNewArticle(article) {
//   readAll(articlePath).then((articles) => {
//     const newArticles = articles.concat(article);
//     return writeAll(newArticles, articlePath);
//   }).then(articles => console.log(articles.length));
// }

// addNewArticle({
//   articleId: uuid.v4(),
//   content: 'hhh',
//   title: 'ttt',
//   articleType: 'sports',
//   ownerId: '9225dcae-e13d-4dca-87f1-89d84e3c4c9d',
// });

// // 账户
// function addNewAccount({ email, password }) {
//   readAll(accountPath).then((accounts) => {
//     if (accounts.find(v => v.email === email)) {
//       throw Error(`there has been an account with email: ${email}`);
//     } else {
//       return accounts.concat({
//         id: uuid.v4(),
//         email,
//         password,
//       });
//     }
//   }).then(accounts => writeAll(accounts, accountPath))
//     .then(accounts => console.log(accounts.length));
// }
// 读取文件，返回json
function readAll(p) {
  return new Promise((resolve, reject) => {
    fs.readFile(p, 'utf8', (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}
function getAllArticles() {
  return readAll(articlePath);
}
function getAllAccounts() {
  return readAll(accountPath);
}
function writeAll(arr, p) {
  return new Promise((resolve, reject) => {
    fs.writeFile(p, JSON.stringify(arr, null, 2), (e) => {
      if (e) reject(e);
      resolve(arr);
    });
  });
}
// 传入的是数组
function writeAllAccounts(arr) {
  return writeAll(arr, accountPath);
}
function writeAllArticles(arr) {
  return writeAll(arr, articlePath);
}
// 根据账号和密码检索用户，成功则返回id，不成功，抛出错误
function loginCheck(email, password) {
  return getAllAccounts()
    .then(data => JSON.parse(data))
    .then((accounts) => {
      const acc = accounts.find(v => v.email === email && v.password === password);
      if (!acc) {
        throw Error('用户不存在');
      }
      return acc;
    });
}
// 注册成功，返回id和邮箱，失败就抛出异常
function registerUser(email, password) {
  return getAllAccounts()
    .then(data => JSON.parse(data))
    .then((users) => {
      if (users.find(user => user.email === email) !== undefined) {
        throw Error('该邮箱已经注册');
      } else {
        const id = uuid.v4();
        return writeAllAccounts(users.concat({
          id,
          email,
          password,
        })).then(() => ({ id, email }));
      }
    });
}
function fetchPrivateArticles(id) {
  return getAllArticles()
    .then(data => JSON.parse(data))
    .then(result => {
      const r = result.filter(v => v.ownerId === id);
      return r;
    })
    .then(result => JSON.stringify(result || []));
}

function add(article) {
  article.articleId = uuid.v4();
  // article.ownerId = ownerId;
  return getAllArticles()
    .then(data => JSON.parse(data))
    .then(result => writeAllArticles(result.concat(article)));
}
function updateArticle(article) {
  return getAllArticles()
    .then(data => JSON.parse(data))
    .then((articles) => {
      const index = articles.findIndex(v => v.id === articles.id);
      const newArticles = articles.slice();
      newArticles[index] = article;
      return writeAllArticles(newArticles);
    });
}

function save(article) {
  if (article.id) {
    // 有id，是更新
    return updateArticle(article);
  }
  // 无id，是新建
  return add(article);
}

function deleteArticle(id) {
  return getAllArticles()
    .then(data => JSON.parse(data))
    .then(articles => writeAllArticles(articles.filter(art => art.articleId !== id)));
}
module.exports.getAllArticles = getAllArticles;
module.exports.loginCheck = loginCheck;
module.exports.registerUser = registerUser;
module.exports.fetchPrivateArticles = fetchPrivateArticles;
module.exports.save = save;
module.exports.deleteArticle = deleteArticle;
