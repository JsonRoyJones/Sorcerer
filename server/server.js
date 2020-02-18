const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const PORT = 3000;
// const assets = require('../client/index.js');
const IssueControllers = require('./controllers/IssueControllers.js');
/**
 * handle parsing request body
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * handle requests for static files
 */
app.use('/', express.static(path.resolve(__dirname, '../client/')));

// handle get request for styles.css
app.get('/styles.css', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../client/styles.css'));
});

// insert route handlers here
app.post('/addIssues', IssueControllers.addIssues, (req, res) => {
  res.status(200).json(res.locals.newIssues);
});

// catch-all route handler for any requests to an unknown route
app.use('*', (req, res) => res.sendStatus(404));
/**
 * express error handler
 * @see https://expressjs.com/en/guide/error-handling.html#writing-error-handlers
 */
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' }
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

/**
 * start server
 */
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
