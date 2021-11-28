var express = require('express');
var app = express();

var server = require('http').Server(app);
var bodyParser = require('body-parser');

//database
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('./data.db');

var axios = require('axios');

//initializing express module to route on public folder
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


//initializing Shopee API

const ShopeeApi = require('shopee-api');

const shopeeApi = new ShopeeApi({
    isUAT: false,
    shopid: 'shop_id',
    partner_id: 'partner_id',
    partner_key: 'partner_key',
    redirect_uri: 'http://localhost:3000/callback', // callback url when perform OAuth
    webhook_url: 'http://localhost:3000/webhook',
    verbose: false // show more logs
});

/*

Shopee API Calls CRUD

*/

shopeeApi.post('/shop/get', {}, function (err, res, body) {
    if(err) {
        throw new Error(err);
    }
    console.log(body);
});

//get item list
shopeeApi.post('/items/get', { 
	pagination_offset : 0,
	pagination_entries_per_page : 100,
	partner_id: 'partner_id',
	shopid: 'shop_id',
	timstamp: new Date().getTime()
}, function (err, res, body) {
    if(err) {
        throw new Error(err);
    }
    console.log(body);
});

//update item list

shopeeApi.post('/item/update', { 
	item_id : 'item_id',
	partner_id: 'partner_id',
	shopid: 'shop_id',
	timstamp: new Date().getTime()
}, function (err, res, body) {
    if(err) {
        throw new Error(err);
    }
    console.log(body);
});

//delete item 

shopeeApi.post('/item/delete', { 
	item_id : 'item_id',
	partner_id: 'partner_id',
	shopid: 'shop_id',
	timstamp: new Date().getTime()
}, function (err, res, body) {
    if(err) {
        throw new Error(err);
    }
    console.log(body);
});

//For other request https://open.shopee.com/documents?version=1

/*

LAZADA API Calls CRUD

*/

const LazadaAPI = require('lazada-open-platform-sdk');
const appKey = 'your_app_key';
const appSecret = 'your_app_secret';

const aLazadaAPI = new LazadaAPI(appKey, appSecret, 'PHILIPPINES');

//test accessToken
aLazadaAPI.generateAccessToken({ code: 'auth_code' })
  .then(function(response){
    const { access_token } = response;
    console.log(response)
})

//apply access token
aLazadaAPI.accessToken = 'some_access_token'

//get orders list

//get item list
aLazadaAPI.getOrders({
	limit : 10
})
.then(function(response) {
	console.log(response);
})

//get item list
aLazadaAPI.getOrderItems({
		order_id : 'your_order_id'
	})
.then(function(response) {
	console.log(response);
	//lazada has all of the metadata in a single order_id
})

//For other request https://open.lazada.com/doc/api.htm


server.listen(3000, function() {
  console.log(" [200] " + "Node Status - running");
});