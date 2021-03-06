const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const config = require('../webpack.config.selfserver');
const path = require('path');
const Express = require('express');
// const FileStore = require('session-file-store')(session);
const history = require('connect-history-api-fallback');
// const RedisStore = require('connect-redis')(session);
const serveStatic = require('serve-static');
const database = require('./data');
// const sessionStore = require('./server/sessionStore').store;

const app = new Express();
const port = 8080;

const compiler = webpack(config);
// app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
// app.use(webpackHotMiddleware(compiler));

// webpack要放在前面才能得到bundle.js
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  // contentBase: './dist',
}));
app.use(webpackHotMiddleware(compiler));
app.use(serveStatic(path.resolve('./dist')));
app.use(cookieParser());
// app.use((req, res, next) => {
//   // console.log(next);
//   if (req.originalUrl === '/login') req.headers.accept = 'text/html';
//   if (!req.cookies.userId) {
//     if (req.originalUrl === '/login') {
//       next();
//     } else {
//       res.status(301);
//       res.location('/login');
//       res.end();
//     }
//   }
// });
app.use(history({
  index: '/index.html',
  // disableDotRule: true,
  verbose: true,
  // rewrites: [{
  //   from: '/login',
  //   to: 'index.html',
  // }],
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(serveStatic(path.resolve('./dist')));

app.use(session({
  // store: new FileStore(),
  // store: new RedisStore(),
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: false,
  cookie: { maxAge: 60000 },
}));

app.get('/fetchAll', (req, res) => {
  database.getAllArticles().then(data => res.end(data));
});
app.get('/fetchPrivate', (req, res) => {
  database.fetchPrivateArticles(req.cookies.userId).then(data => res.end(data));
});
app.post('/login', (req, res) => {
  database.loginCheck(req.body.email, req.body.password).then((acc) => {
    // req.session.userId = acc.id;
    // req.session.email = acc.email;
    // req.session.save((err) => {
    //   if (err) console.log(err);
    //   else console.log('save session');
    // });
    res.setHeader('Set-Cookie', [`sid=${req.sessionID}`, [`email=${acc.email}`], [`userId=${acc.id}`]]);
    res.end();
  });
});
app.post('/regist', (req, res) => {
  database.registerUser(req.body.email, req.body.password).then((acc) => {
    // req.session.email = acc.email;
    // req.session.userId = acc.id;
    // req.session.save((err) => {
    //   if (err) console.log(err);
    //   else console.log('save session');
    // });
    res.setHeader('Set-Cookie', [`sid=${req.sessionID}`, [`email=${acc.email}`], [`userId=${acc.id}`]]);
    res.end();
  });
});
app.post('/save', (req, res) => {
  req.body.ownerId = req.cookies.userId;
  database.save(req.body).then(() => res.end());
});
app.post('/deleteArticle', (req, res) => {
  database.deleteArticle(req.body.articleId).then(() => res.end());
});

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
  }
});

