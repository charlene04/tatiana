var mongoose = require("mongoose");
const url = process.env.DATABASEURL;
var _db;

var options = {
  server: {
      socketOptions: {
          autoReconnect: true,
          keepAlive: 1,
          connectTimeoutMS: 30000,
          socketTimeoutMS: 0
      }
  }, useNewUrlParser: true ,
  replSet: {
      socketOptions: {
          keepAlive: 1,
          connectTimeoutMS: 30000,
          socketTimeoutMS: 0
      }
  }
}


module.exports = {
    connectToServer: async function main(){
        try{
           _db = await mongoose.connect(url, options);
           console.log(_db)
        }  
    
        catch(err){ console.error(err); } // catch any mongo error here
        finally{ console.log("db connected!") } // make sure to close your connection after
       },

  getDb: async function() {
    return _db;
  }
};

