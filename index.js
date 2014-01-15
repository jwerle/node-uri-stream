
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

  stream.source = null;

  fetch(uri, opts, function (err, res) {
    if (err) {
      return stream.emit('error', err);
    } else {
      stream.source = res;
      res.pipe(stream);
    }
  });
  return stream;
};
