var express = require('express');
var cityRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
// var url = 'mongodb://localhost:27017';
var url = 'mongodb+srv://Sawan_10:Sawan1997@cluster0.dsspq.mongodb.net/aryabhat?retryWrites=true&w=majority';

function router(menu){
    cityRouter.route('/')
        .get(function(req, res) {
            mongodb.connect(url, (err, connection) => {
                if(err) {
                    res.status(500).send("Error While Connecting");
                }else {
                    const dbo = connection.db('aryabhat');
                    dbo.collection('city').find({}).toArray((err, data) => {
                        if(err) {
                            res.status(501).send("Error While Fetching");
                        }else {
                            res.render('city', {title: 'City Page', citydata:data, menubar: menu})
                        }
                    })
                }
            })
        });


    //http://localhost:8900/city/details
    cityRouter.route('/details/:id')
        .get(function(req, res) {
            var id = req.params.id;
            mongodb.connect(url, (err, connection) => {
                if(err) {
                    res.status(500).send("Error While Connecting");
                }else {
                    const dbo = connection.db('aryabhat');
                    dbo.collection('city').findOne({_id:id}, (err, data) => {
                        if(err) {
                            res.status(501).send("Error While Fetching");
                        }else {
                            res.render('cityDetails', {title: `City Details Page`, citydata: data, menu});
                        }
                    })
                }
            })
        });

    return cityRouter;
}

module.exports = router;