'use strict';

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
app.use(cors());

const client_id = process.env.client_id;
const client_secret = process.env.client_secret;

app.get('/connect/:code', async (req, res) => {
  const code = req.params.code;
  console.log(code);
  const data = {
    code,
    client_id: client_id,
    client_secret: client_secret
  };
  const url = 'https://github.com/login/oauth/access_token';
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const token = await response.text();
  res.json(token);
});

app.get('/status', (req, res) => res.send('Service is Up'));
const port = process.env.port;
app.listen(port, () => console.log('Example app listening on port', port));