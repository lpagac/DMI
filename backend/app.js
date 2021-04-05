/** Strings app backend API server */

const express = require('express');
const cors = require('cors');

const stringsRoutes = require('./routes/strings');
const {NotFoundError} = require('./expressError');

const app = express();

app.use(cors());
app.use(express.json()); 
app.use('/api/strings', stringsRoutes);

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;