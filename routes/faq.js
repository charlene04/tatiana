var router = require("express").Router();


router.get("/faq", function(req, res){
    res.render("../views/faq");
});

module.exports = router;