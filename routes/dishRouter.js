const express=require('express');

const bodyParser = require('body-parser');

const dishRouter=express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/').all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader("Content-Type","text/plain");
    next();
})

.get((req,res,next)=>{
    res.end("Will send all the dishes to you");
})

.post((req,res,next) => {
    res.end("Will add the dish:" + req.body.name + ' with detalis :' + req.body.description);
})

.put((req,res,next) => {
    res.statusCode=403;
    res.end("PUT operation not supported on dishes");
})

.delete((req,res,next) => {
    res.end("Will be deleted all the dishes");
});

//Maja code

dishRouter.route('/:dishId').all((req,res,next) => {
    res.statusCode=200;
    res.setHeader("Content-Type","text/plain");
    next();
})
.get((req,res,next) =>{
        res.end("We will send the dish with " + req.params.dishId +" to you");
})
.put((req,res,next) => {
    res.statusCode=403;
    res.end("Put operation is not available");
})
.post((req,res,next) => {
    res.end("Will add the dish:" + req.body.ime + ' with detalis :' + req.body.opis);
})
.delete((req,res,next) => {
    res.end("Will be delete the dish with" + req.params.dishId + "with name " + req.body.ime) ;
});


module.exports = dishRouter;

