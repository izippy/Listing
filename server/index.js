// ===========================
// FOR EC2 INSTANCE
// ===========================
// const newrelic = require('newrelic');
// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const db = require('./database3/index.js');
// const port = 3005;

// ===========================
// FOR LOCALHOST
// ===========================
require('newrelic');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const db = require('../database')
const db = require('../database3/index.js');
// const rd = require('../redis');
const port = 3005;
const expressStaticGzip = require("express-static-gzip");
const morgan = require('morgan');
app.use(bodyParser.json());

// =========================================
// ENDPOINT FOR LOADER.IO VERIFICATION
//  ========================================
app.get('/loaderio*', (req, res, next) => {
	res.sendFile('/home/ec2-user/public/loaderio-4e9958e3d302f5d0effee161d8542d17.txt')
	console.log('are we still serving up the bundle?');
	next();
});

// =========================================
// STANDARD ENDPOINTS
// =========================================
app.use('/:listingID',express.static("public"));

// =========================================
// WITHOUT REDIS CACHE
// =========================================
app.get('/listing/desc/:listingID', (req, res) => {
	console.log('desc req.params.listingID: ', req.params.listingID)
	const query = `SELECT * from listings WHERE id = ?`;
	const params = [req.params.listingID];

	db.execute(query, params, { prepare: true })
		.then(data => res.status(200).send(data.rows[0]))
		.catch(() => res.sendStatus(500));
})

app.get('/listing/amenity/:listingID',(req,res)=>{
	console.log('amenity req.params.listingID: ', req.params.listingID)
	const query = `SELECT * from amenities WHERE id = ?`;
	const params = [req.params.listingID];

	db.execute(query, params, { prepare: true })
		.then(data => res.status(200).send(data.rows))
		.catch(() => res.sendStatus(500));
});

// =========================================
// POST REQUESTS
// =========================================
app.post('/listing/desc/:listingID',(req,res)=>{
	console.log('req.params.listingID: ', req.params)
	const query = `INSERT into izippy.listings(id, title, loc, username, pic, detailtype, detailbedrmnum, detailbathrmnum, detailguestmax,\ 
detailbeds, detailbednum, highlight1, highlight2, highlight3, highlight4, general, thespace, guestaccess, interactionwithguests,\ 
otherthingstonote, license) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
	const params = [10000001, 'Porky pig bacon house', 'Farmville', 'Porky', 'https://s3.amazonaws.com/uifaces/faces/twitter/envex/128.jpg','Entire place', 2, 1, 2, ['1 single', '1 single'], 2, 'h1', 'h2', 'h3', 'h4', 'general', 'space', 'guestaccess', '*', '*', 'STR-12345567'];
	db.execute(query, params, { prepare: true })
		.then(() => res.sendStatus(201));
});

app.post('/listing/amenity/:listingID',(req,res)=>{
	console.log('req.params.listingID: ', req.params)

	const queries = [
		{
			query: `INSERT INTO izippy.amenities (id, categories, item, itemdescription) VALUES (?, ?, ?, ?)`,
			params: [10000001, 'Basic', 'Wifi', 'Continuous access in the listing']
		},
		{
			query: `INSERT INTO izippy.amenities (id, categories, item, itemdescription) VALUES (?, ?, ?, ?)`,
			params: [10000001, 'Not included', 'Air conditioning', '*']
		},
		{
			query: `INSERT INTO izippy.amenities (id, categories, item, itemdescription) VALUES (?, ?, ?, ?)`,
			params: [10000001, 'Not included', 'Heating', '*']
		},
		{
			query: `INSERT INTO izippy.amenities (id, categories, item, itemdescription) VALUES (?, ?, ?, ?)`,
			params: [10000001, 'Bed_and_bath', 'Shampoo', '*']
		},
	];

	db.batch(queries, { prepare: true })
		.then(() => res.sendStatus(201));
});

// =========================================
// WITH REDIS CACHE
// =========================================
// app.get('/listing/desc/:listingID', (req, res) => {
// 	console.log('req.params.listingID: ', req.params.listingID)
// 	const query = `SELECT * from listings WHERE id = ?`;
// 	const params = [req.params.listingID];
// 	const descRedisKey = `listing:desc${req.params.listingID}`;

// 	return rd.get(descRedisKey, (err, data) => {
// 		if (data) {
// 			console.log('listing exists in redis')
// 			return res.status(200).send(data);
// 		} else {
// 			console.log('query listing from db')
// 			db.execute(query, params, { prepare: true })
// 			.then(data => {
// 				rd.setex(descRedisKey, 3600, JSON.stringify(data.rows[0]))
// 				return res.send(data.rows)
// 			})
// 			.catch(() => res.status(500).send(err));
// 		}
// 	});
// });

// // check to see if amenities query result is in cache
// app.get('/listing/amenity/:listingID', (req, res) => {
// 	console.log('req.params.listingID: ', req.params.listingID)
// 	const query = `SELECT * from amenities WHERE id = ?`;
// 	const params = [req.params.listingID];
// 	const amenityRedisKey = `listing:amenity${req.params.listingID}`;

// 	return rd.get(amenityRedisKey, (err, data) => {
// 		if (data) {
// 			console.log('in redis for amenity')
// 			res.status(200).send(data.rows);
// 		} else {
// 			console.log('query amenity from db')
// 			db.execute(query, params, { prepare: true })
// 			.then((data) => {
// 				rd.setex(amenityRedisKey, 3600, JSON.stringify(data.rows))	
// 				return res.send(data.rows)
// 			})
// 			.catch(err => {
// 				console.error(err);
// 				res.status(500).send(err);
// 			})	// catch err
// 		}
// 	});
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
module.exports = app;