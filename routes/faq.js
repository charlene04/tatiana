var router = require("express").Router();


router.get("/faq", function(req, res){
    res.render("faq");
});

module.exports = router;