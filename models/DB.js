var mongoose = require("mongoose");
const MongoClient = require( 'mongodb' ).MongoClient;
const url = process.env.DATABASEURL;
console.log(url);
var _db;

module.exports = {
    connectToServer: async function main(){
        let client;
        try{
           client = await new MongoClient.connect(url,  { useNewUrlParser: true, useUnifiedTopology: true });
           client.connect(err => {
            _db = await client.db('tatiana');
            // perform actions on the collection object
            client.close();
          });
             
        }
        catch(err){ console.error(err); } // catch any mongo error here
        finally{ client.close(); } // make sure to close your connection after
       },
       /*
  connectToServer: async function( callback ) {
    await MongoClient.connect( url,  { useNewUrlParser: true, useUnifiedTopology: true }, function(client) {
      _db  = await client.db('tatiana');
      return callback( err );
    } );
  },*/

  getDb: function() {
    return _db;
  }
};

