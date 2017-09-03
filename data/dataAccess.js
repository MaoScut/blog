const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

const articlePath = path.join(__dirname, 'article.json');
const accountPath = path.join(__dirname, 'account.json');
function readAll(p) {
  return new Promise((resolve, reject) => {
    fs.readFile(p, 'utf8', (err, data) => {
      if (err) reject(err);
      resolve(JSON.parse(data));
    });
  });
}
function writeAll(arr, p) {
  return new Promise((resolve, reject) => {
    fs.writeFile(p, JSON.stringify(arr, null, 2), (e) => {
      if (e) reject(e);
      resolve(arr);
    });
  });
}

// 文章
function addNewArticle(article) {
  readAll(articlePath).then((articles) => {
    const newArticles = articles.concat(article);
    return writeAll(newArticles, articlePath);
  }).then(articles => console.log(articles.length));
}

addNewArticle({
  articleId: uuid.v4(),
  content: 'hhh',
  title: 'ttt',
  articleType: 'sports',
  ownerId: '9225dcae-e13d-4dca-87f1-89d84e3c4c9d',
});

// 账户
function addNewAccount({ email, password }) {
  readAll(accountPath).then((accounts) => {
    if (accounts.find(v => v.email === email)) {
      throw Error(`there has been an account with email: ${email}`);
    } else {
      return accounts.concat({
        id: uuid.v4(),
        email,
        password,
      });
    }
  }).then(accounts => writeAll(accounts, accountPath))
    .then(accounts => console.log(accounts.length));
}
// addNewAccount({
//   email: uuid.v4(),
//   password: 123,
// });
