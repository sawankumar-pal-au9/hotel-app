var express = require('express');
var hotelRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
// var url = 'mongodb://localhost:27017';
var url = 'mongodb+srv://Sawan_10:Sawan1997@cluster0.dsspq.mongodb.net/aryabhat?retryWrites=true&w=majority';

function router(menu){
    hotelRouter.route('/')
        .get(function(req, res) {
            //creating connection
            mongodb.connect(url, (err, connection) => {
                if(err) {
                    res.status(500).send("Error While Connecting");
                }else{
                    //connection got created now passing db name
                    const dbo = connection.db('aryabhat');
                    //making find query on collection
                    dbo.collection('hotels').find({}).toArray((err, data) => {
                        if(err) {
                            res.status(501).send("Error While Fetching");
                        }else {
                            res.render('hotel', {title: 'Hotel Page', hoteldata: data, menubar: menu})
                        }
                    })
                }
            })
        });

    //http://localhost:8900/hotel/details
    hotelRouter.route('/details/:id')
        .get(function(req, res) {
            var id = req.params.id;
            mongodb.connect(url, (err, connection) => {
                if(err) {
                    res.status(500).send("Error While Connecting");
                }else {
                    const dbo = connection.db('aryabhat');
                    dbo.collection('hotels').findOne({_id:id}, (err, data) => {
                        if(err) {
                            res.status(501).send("Error While Fetching");
                        }else {
                            res.render('hotelDetails', {title: `Hotel Details Page`, hoteldata: data, menu});
                        }
                    })
                }
            })
        });

    return hotelRouter;
}

module.exports = router;