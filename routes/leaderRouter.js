const express=require("express");

const bodyParser = require("body-parser");

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

const mongoose = require('mongoose');

const Leaders = require('../models/leaders');

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.get((req,res,next) =>{
    Leaders.find({})
    .then((leader) =>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req,res,next) =>{
    Leaders.create(req.body)
    .then((leader) => {
        console.log("Leader created:");
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req,res,next) =>{
    res.statusCode=403;
    res.end("Put operation not supported on /leaders");
})
.delete((req,res,next) =>{
    Leaders.remove({})
    .then((resp) => {
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err) => next(err))
    .catch((err) => next(err));
});

leaderRouter.route('/:leadersId')
.get((req,res,next) => {
    Leaders.findById(req.params.leadersId)
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req,res,next) =>{
    res.statusCode=403;
    res.end("Post not supported on /leaders/ledersId");
})
.put((req,res,next) =>{
    Leaders.findByIdAndUpdate(req.params.leadersId, {
        $set:req.body} , {new:true})
        .then((leader) => {
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(leader);
        },(err) => next(err))
        .catch((err) => next(err));
})
.delete((req,res,next) => {
    Leaders.findByIdAndRemove(req.params.leadersId)
    .then((resp) => {
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err) => next(err))
    .catch((err) => next(err));
})

// leaderRouter.route('/').all((req,res,next)=>{
//     res.statusCode=200;
//     res.setHeader("Content-Type","text/plain");
//     next();
// })

// .get((req,res,next)=>{
//     res.end("Will send all the leaders to you");
// })
// .post((req,res,next) => {
//     res.end("Will add the leader:" + req.body.ime + ' with detalis :' + req.body.opis);
// })
// .put((req,res,next) => {
//     res.statusCode=403;
//     res.end("PUT operation not supported on leaders");
// })
// .delete((req,res,next) => {
//     res.end("Will be deleted all the leaders");
// });

// leaderRouter.route('/:leadersId').all((req,res,next) =>{
//     res.statusCode=200;
//     res.setHeader("Content-Type","text/plain");
//     next();
// })
// .get((req,res,next) =>{
//     res.end("We will send the leader with " + req.params.leadersId +" to you");
// })
// .put((req,res,next) =>{
//     res.statusCode=403;
//     res.end("PUT operation not supported on leaders!");
// })
// .post((req,res,next) =>
// {
//     res.end("We will add the promotion with " + req.params.leadersId + "and name:" + req.body.name +" to you");
// })
// .delete((req,res,next) =>{
//     res.end("We will delete the promo with" + req.params.leadersId + "and name" + req.body.name);
// })

module.exports=leaderRouter;

