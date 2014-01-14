
var fetch = require('./')
  , assert = require('assert')
  , fs = require('fs')
  , http = require('http')
  , csso = require('csso')
  , through = require('through')

var exit = process.exit;
var stdout = process.stdout;
var fread = fs.readFileSync;
var port = 4444;
var server = null;

function ok (s) {
  console.log("   '%s' ok (✓)", s);
}

function fail (e) {
  console.error("   '%s' fail (X)", e);
}

function test (title, uri, expected) {
  var stream = null;
  var hasError = false;
  return (stream = fetch(uri))
  .on('error', function (err) {
    fail(err.message);
    hasError = true;
    stream.end();
  })
  .on('data', function (chunk) {
    assert(expected == String(chunk));
  })
  .on('end', function () {
    if (false == hasError) {
      ok(title);
    }
  });
}

test("url encoded data",
     'data:,Hello%2C%20World!',
     "Hello, World!");

test("base64-encoded data",
     'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ%3D%3D',
     "Hello, World!");

test("file protocol",
     'file:'+ __filename,
     String(fread(__filename)));

server = http.createServer(function (req, res) {
  res.end("ok!");
  server.close();
}).listen(port, function () {
  test("http protocol",
       'http://127.0.0.1:'+ port,
       "ok!");
});

// transform test
var expected = "body{background:green;color:#00f}body,div{display:block}div{padding:5px 3px;border:2px solid #cecece;margin:5px}"
fetch('file:'+ __dirname +'/test.css')
.pipe(through(function (chunk) {
  this.emit('data', csso.justDoIt(String(chunk)));
}))
.on('data', function (chunk) {
  assert(expected == chunk);
})
.on('error', function (err) {
  fail(err.message);
  exit(0);
})
.on('end', function () {
  ok("transform");
});
