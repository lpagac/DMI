const express = require('express');
const router = new express.Router();
const {v4: uuidv4} = require("uuid");
const { ExpressError, BadRequestError } = require('../expressError');

/* routes for fetching all strings and prepending string */

const strings = [
  {id: uuidv4(), string: 'react-boilerplate'},
  {id: uuidv4(), string: 'is'},
  {id: uuidv4(), string: 'neato'}
];


/** GET /api/strings:  { } => { strings }
 *
 * Returns json with strings array, 500 if unable.
 *
 * Authorization required: none
 */

router.get('/', function(req, res) {
  try {
    return res.json({
      status: 200,
      strings,
    });
  } catch (err) {
    throw new ExpressError('unable to fetch strings', 500);
  }
});

/** POST /api/strings:  { str } => { }
 *
 * Returns status 200 if successful, 400 if no input sent.
 *
 * Authorization required: none
 */

router.post('/', function(req, res) {
  const { id, string } = req.body;
  if (!string || !string.trim()) {
    throw new BadRequestError('no input');
  } else {
    strings.unshift({id, string});
    res.json({
      status: 200,
      strings,
    })
  }
});

module.exports = router;
