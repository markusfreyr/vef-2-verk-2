const express = require('express');
const expressValidator = require('express-validator');

const passport = require('passport');
const { Strategy } = require('passport-local');

const session = require('express-session');

const router = express.Router();
const users = require('./users');

router.use(expressValidator());

const bodyParser = require('body-parser');
const { Client } = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgres://:@localhost/postgres';

const sessionSecret = 'leyndarmál';

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true,
}));


router.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
}));

function strat(username, password, done) {
  users
    .findByUsername(username)
    .then((user) => {
      if (!user) {
        return done(null, false);
      }

      return users.comparePasswords(password, user);
    })
    .then(res => done(null, res))
    .catch((err) => {
      done(err);
    });
}

passport.use(new Strategy(strat));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  users
    .findById(id)
    .then(user => done(null, user))
    .catch(err => done(err));
});


router.use(passport.initialize());
router.use(passport.session());


router.use((req, res, next) => {
  if (req.isAuthenticated()) {
    // getum núna notað user í viewum
    res.locals.user = req.user;
  }

  next();
});

async function fetchNotes() {
  const client = new Client({ connectionString });
  await client.connect();
  const result = await client.query('SELECT * FROM vefur');
  await client.end();
  return result.rows;
}

async function addNote(name, ssn, email, fjoldi) {
  const client = new Client({ connectionString });
  await client.connect();
  await client.query('INSERT INTO vefur (name,ssn,email,fjoldi) VALUES ($1,$2,$3,$4)', [name, ssn, email, fjoldi]);
  await client.end();
}


function ensureLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.redirect('/login');
}

router.get('/admin', async (req, res) => {
  if (req.isAuthenticated()) {
    return res.render('admin', { notandi: req.user.name });
  }

  return res.send(`
    <p><a href="/login">Innskráning</a></p>
  `);
});

router.get('/', (req, res) => {
  res.render('form', {
    title: 'Form',
    message: '',
    errors: {},
    notandi: req.user,
  });
});

router.post('/', (req, res) => {
  req.assert('name', 'Name is required').notEmpty();
  req.assert('email', 'Email is required').notEmpty();
  req.assert('email', 'A valid email is required').isEmail();
  req.assert('ssn', 'A ssn is required').notEmpty();
  req.assert('ssn', 'A valid ssn is required').matches(/^[0-9]{6}-?[0-9]{4}$/);
  req.assert('fjoldi', 'Fjöldi verður að vera tala, stærri en 0').isInt({ min: 0 });
  const errors = req.validationErrors();
  if (!errors) { // No errors were found.  Passed Validation!
    res.render('form', {
      title: 'Form ',
      message: 'Passed Validation!',
      errors: {},
      notandi: req.user,
    });
    addNote(req.body.name, req.body.ssn, req.body.email, req.body.fjoldi);
  } else { // Display errors to user
    res.render('form', {
      title: 'Form ',
      message: '',
      errors,
      notandi: req.user,
    });
  }
});

router.get('/login', (req, res) => {
  res.send(`
    <form method="post" action="/login">
      <label>Notendanafn: <input type="text" name="username"></label>
      <label>Lykilorð: <input type="password" name="password"></label>
      <button>Innskrá</button>
    </form>
  `);
});

router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/login',
  }),
  (req, res) => {
    res.redirect('/admin');
  },
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
