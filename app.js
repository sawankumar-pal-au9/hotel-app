var express = require('express');
var app = express();
var port = process.env.PORT || 8900;
var menu = [
    {Link: '/', page: 'Home'},
    {Link: '/city', page: 'City'},
    {Link: '/hotel', page: 'Hotels'}
]
var hotelRouter = require('./src/routes/HotelRouter')(menu);
var cityRouter = require('./src/routes/CityRouter')(menu);

//static file
app.use(express.static(__dirname+'/public'));
//html files
app.set('views', './src/views');
//view engine
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    // res.send('Hi from express');
    res.render('index', {title: 'Home', menubar: menu});
});

app.use('/hotel', hotelRouter);
app.use('/city', cityRouter);

app.listen(port, function(err) {
    if(err) throw err;
    console.log(`Server is running on port ${port}`);
});