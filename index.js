
/**
 * Module dependencies
 */

var fetch = require('get-uri')
  , through = require('through')

/**
 * Returns a readable stream that
 * reads the contents of a given
 * URI
 *
 * @api public
 * @param {String} uri
 * @param {Object} opts - optional
 */

module.exports = function (uri, opts) {
  var stream = through();

  fetch(uri, opts, function (err, res) {
    if (err) {
      return stream.emit('error', err);
    } else {
      res.pipe(stream);
    }
  });
  return stream;
};
