const express=require("express");

const bodyParser = require("body-parser");

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/').all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader("Content-Type","text/plain");
    next();
})

.get((req,res,next)=>{
    res.end("Will send all the leaders to you");
})
.post((req,res,next) => {
    res.end("Will add the leader:" + req.body.ime + ' with detalis :' + req.body.opis);
})
.put((req,res,next) => {
    res.statusCode=403;
    res.end("PUT operation not supported on leaders");
})
.delete((req,res,next) => {
    res.end("Will be deleted all the leaders");
});

leaderRouter.route('/:leadersId').all((req,res,next) =>{
    res.statusCode=200;
    res.setHeader("Content-Type","text/plain");
    next();
})
.get((req,res,next) =>{
    res.end("We will send the leader with " + req.params.leadersId +" to you");
})
.put((req,res,next) =>{
    res.statusCode=403;
    res.end("PUT operation not supported on leaders!");
})
.post((req,res,next) =>
{
    res.end("We will add the promotion with " + req.params.leadersId + "and name:" + req.body.name +" to you");
})
.delete((req,res,next) =>{
    res.end("We will delete the promo with" + req.params.leadersId + "and name" + req.body.name);
})

module.exports=leaderRouter;

