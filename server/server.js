const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const PORT = 3007;
const assets = require('../client/main');
const taskControllers = require('./controllers/taskControllers');
const http = require('http');
/**
 * handle parsing request body
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * handle requests for static files
 */
app.use('/', express.static(path.resolve(__dirname, './client/assets')));
// serve index.html on page load
app.get('/', (req, res) =>
  res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'))
);
// handle get request for styles.css
app.get('/assets/styles.css', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../client/assets/styles.css'));
});
// handle get request for main.js
app.get('/js/bundle.js', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../client/js/bundle.js'));
});
// insert route handlers here
// get request for tasks
app.get('/tasks', taskControllers.getTasks, (req, res) => {
  res.status(200).json(res.locals.tasks);
});
// post new task
app.post('/addTask', taskControllers.addTask, (req, res) => {
  res.status(200).json(res.locals.newTask);
});
// delete new task
app.delete('/deleteTask/:id', taskControllers.deleteTask, (req, res) => {
  res.status(200).json(res.locals.task);
});

// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.sendStatus(404));
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
