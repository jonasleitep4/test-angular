const express = require('express');
const session = require('express-session');
const path    = require('path');
const cors    = require('cors');
const axios   = require('axios');
const nomeApp = process.env.npm_package_name || 'app';
const app     = express();

require('dotenv').config();

app.use(cors());
app.use(express.static(`${__dirname}/dist/${nomeApp}`));
app.use(session({
  secret           : '6373E5DA8C4AC66',
  resave           : false,
  saveUninitialized: false
}));

app.get('/callback', async (req, res) => {
  const response = await axios.post(
    'https://github.com/login/oauth/access_token',
    {
      client_id    : process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code         : req.query.code
    },
    {
      headers: {
        accept: 'application/json'
      }
    }
  );

  if (response.status === 200) {
    req.session.auth = response.data;
  }

  return res.redirect(`${process.env.APP_URL}/user`);
});

app.get('/auth', (req, res) => {
  return res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}`);
});

app.get('/session', (req, res) => {
  return res.json(req.session.auth || {});
});

app.get('/*', (req, res) => {
  return res.sendFile(path.join(`${__dirname}/dist/${nomeApp}/index.html`));
});

app.listen(process.env.PORT || 3000);