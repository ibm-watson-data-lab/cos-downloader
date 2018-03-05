// built-in Node.js crypto library
const crypto = require('crypto');

// serverless function that generates a new Object Storage pre-signed URL that allows
// a file to be uploaded to Object Storage without knowing the secret key. Expects:
// access_key - the Object Storage public access key
// secret_key - the Object Storage private access key
// bucket - the Object Storage bucket to write to e.g. mybucket
// endpoint - the API endpoint to use e.g. 'https://s3-api.us-geo.objectstorage.softlayer.net'
// id - the id of the file to download e.g. test.txt
const main = function(msg) {

  // pre-sign the request
  var expires = '' + Math.floor(((new Date()).getTime()/1000) + 60)
  var path = '/' + msg.bucket + '/' + msg.id
  var hmac = crypto.createHmac('sha1', msg.secret_key);
  hmac.update('GET\n' + '\n' + '\n' + expires + '\n' + path)
  var signature = hmac.digest('base64')

  // generate URL
  var params = 'AWSAccessKeyId=' + encodeURIComponent(msg.access_key) + '&Signature=' + encodeURIComponent(signature) + '&Expires=' + encodeURIComponent(expires)
  var request_url = msg.endpoint + path + '?' + params
  return { statusCode: 302, headers: { Location: request_url }}
}

exports.main = main
