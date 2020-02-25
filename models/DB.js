var mongoose = require("mongoose");
const MongoClient = require( 'mongodb' ).MongoClient;
const url = process.env.DATABASEURL;
console.log(url);
var _db;

module.exports = {

  connectToServer: function( callback ) {
    MongoClient.connect( url,  { useNewUrlParser: true, useUnifiedTopology: true }, function( err, client ) {
      _db  = client.tatiana('test_db');
      return callback( err );
    } );
  },

  getDb: function() {
    return _db;
  }
};