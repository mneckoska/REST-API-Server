const express=require("express");

const bodyParser = require("body-parser");

const mongnoose = require('mongoose');

const Promotions = require('../models/promotions');

const promoRouters = express.Router();
promoRouters.use(bodyParser.json());

promoRouters.route('/')
.get((req,res,next) => {
    Promotions.find({})
    .then((promo) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req,res,next) => {
    Promotions.create(req.body)
        .then((promo) =>{
        console.log('Promotions created ', promo);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req,res,next) =>{
    res.statusCode=403;
    console.log("Put operation not supported on /promotions");
})
.delete((req,res,next) =>{
    Promotions.remove({})
    .then((resp) =>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

promoRouters.route('/:promotionsId')
.get((req,res,next) =>{
    Promotions.findById(req.params.promotionsId)
    .then((promo)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req,res,next) =>{
    res.statusCode=403;
    res.end("Post operation not supported on /promotionsId");
})
.put((req,res,next) =>
{
    Promotions.findByIdAndUpdate(req.params.promotionsId, {
        $set: req.body },{new:true})
        .then((promo) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promo);
        }, (err) => next(err))
        .catch((err) => next(err));
})
.delete((req,res,next) =>
{
    Promotions.findByIdAndRemove(req.params.promotionsId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

// promoRouters.route('/').all((req,res,next)=>{
//     res.statusCode=200;
//     res.setHeader("Content-Type","text/plain");
//     next();
// })

// .get((req,res,next)=>{
//     res.end("Will send all the promotions to you");
// })
// .post((req,res,next) => {
//     res.end("Will add the promoton:" + req.body.ime + ' with detalis :' + req.body.opis);
// })
// .put((req,res,next) => {
//     res.statusCode=403;
//     res.end("PUT operation not supported on promotions");
// })
// .delete((req,res,next) => {
//     res.end("Will be deleted all the promotions");
// });

// promoRouters.route('/:promotionsId').all((req,res,next) =>{
//     res.statusCode=200;
//     res.setHeader("Content-Type","text/plain");
//     next();
// })
// .get((req,res,next) =>{
//     res.end("We will send the promotion with " + req.params.promotionsId +" to you");
// })
// .put((req,res,next) =>{
//     res.statusCode=403;
//     res.end("PUT operation not supported on promotions!");
// })
// .post((req,res,next) =>
// {
//     res.end("We will add the promotion with " + req.params.promotionsId + "and name:" + req.body.name +" to you");
// })
// .delete((req,res,next) =>{
//     res.end("We will delete the promo with" + req.params.promotionsId + "and name" + req.body.name);
// })

module.exports=promoRouters;

