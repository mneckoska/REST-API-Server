const express=require("express");

const bodyParser = require("body-parser");

const promoRouters = express.Router();

promoRouters.use(bodyParser.json());

promoRouters.route('/').all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader("Content-Type","text/plain");
    next();
})

.get((req,res,next)=>{
    res.end("Will send all the promotions to you");
})
.post((req,res,next) => {
    res.end("Will add the promoton:" + req.body.ime + ' with detalis :' + req.body.opis);
})
.put((req,res,next) => {
    res.statusCode=403;
    res.end("PUT operation not supported on promotions");
})
.delete((req,res,next) => {
    res.end("Will be deleted all the promotions");
});

promoRouters.route('/:promotionsId').all((req,res,next) =>{
    res.statusCode=200;
    res.setHeader("Content-Type","text/plain");
    next();
})
.get((req,res,next) =>{
    res.end("We will send the promotion with " + req.params.promotionsId +" to you");
})
.put((req,res,next) =>{
    res.statusCode=403;
    res.end("PUT operation not supported on promotions!");
})
.post((req,res,next) =>
{
    res.end("We will add the promotion with " + req.params.promotionsId + "and name:" + req.body.name +" to you");
})
.delete((req,res,next) =>{
    res.end("We will delete the promo with" + req.params.promotionsId + "and name" + req.body.name);
})

module.exports=promoRouters;

