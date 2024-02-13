import express, { response } from 'express';
import bodyParser from 'body-parser';
import crypto from 'crypto';

import { registerUser } from '../users/register.mjs';
import { createForm } from '../forms/create-form.mjs';
import { sendResponse } from '../forms/send-response.mjs';

const app = express();

app.use(bodyParser.json());

app.post('/register', async (req, res) => {
  let username = req.body.username
  let password = req.body.password

  let secret_token = crypto.randomBytes(8).toString("hex")

  try {
    await registerUser(username, password, secret_token)
    res.send({
      'secret_token': secret_token
    })
  }
  catch (error) {
    res.send({
      'error': error.message
    })
  }
})

app.post('/forms/create', async (req, res) => {
  let username = req.body.username
  let secret_token = req.body.secret_token

  let form_id = crypto.randomBytes(8).toString("hex")

  let plugins = req.body.plugins

  try {
    await createForm(form_id, plugins, username, secret_token)
    res.send({
      'form_id': form_id
    })
  }
  catch (error) {
    res.send({
      'error': error.message
    })
  }
  return form_id
})

app.post('/forms/:form_id/send_response', async (req, res) => {
  let form_id = req.params.form_id

  let secret_token = req.body.secret_token
  
  let response = req.body.response

  let response_id = crypto.randomBytes(8).toString("hex")

  try {
    await sendResponse(response, response_id, form_id, secret_token)
    res.send("Response sent successfully")
  }
  catch (error) {
    res.send({
      'error': error.message
    })
  }
})

const port=3000;
app.listen(port);