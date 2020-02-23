var helmet = require("helmet"),
    compression = require("compression");

    module.exports = function(app){
        app.use(helment());
        app.use(compression());
    }