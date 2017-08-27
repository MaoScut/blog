let http = require('http');
let path = require('path');
let session = require('express-session');
let Express = require('express');
let bodyParser = require('body-parser');

let app = Express();
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json 
app.use(bodyParser.json())
app.set('views', __dirname + 'views');
// Use the session middleware 
// app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

// Access the session as req.session 
app.get('/', function(req, res, next) {
 if (req.session.views) {
   req.session.views++
   res.setHeader('Content-Type', 'text/html')
   res.write('<p>views: ' + req.session.views + '</p>')
   res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
   res.end()
 } else {
   req.session.views = 1
   res.end('welcome to the session demo. refresh!')
 }
})

// app.get('/', (req, res) => {
//   // res.render('Home.html');
//   res.sendFile(path.resolve('./views/Home.html'), (err) => {
//     if(err) {
//       console.log(err);
//       res.status(err.status).end();
//     } else {
//       console.log('send home.html');
//     }
//   })
// });

app.get('/login', (req, res) => {
  // res.render('Home.html');
  res.sendFile(path.resolve('./views/Login.html'), (err) => {
    if(err) {
      console.log(err);
      res.status(err.status).end();
    } else {
      console.log('send login.html');
    }
  })
});
app.post('/login', (req, res) => {
  let data = JSON.stringify(req.body);
  console.log(data);
  res.sendFile(path.resolve('./views/Login.html'), (err) => {
    if(err) {
      console.log(err);
      res.status(err.status).end();
    } else {
      console.log('send login.html');
    }
  })
})
http.createServer(app).listen(3000, () => console.log('listening on port 3000!'));