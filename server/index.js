//server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const db = require('../database')
const db = require('../database3')
const port = 3005;
const expressStaticGzip =require("express-static-gzip");
const morgan = require('morgan');

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/:listingID',express.static("public"));
// app.use('/:listingID', expressStaticGzip('public', {
//     enableBrotli: true,
//     orderPreference: ['br', 'gz'],
//     setHeaders: function (res, path) {
//        res.setHeader("Cache-Control", "public, max-age=31536000");
//     }
// }));

app.get('/listing/desc/:listingID', (req, res) => {
	console.log('req.params.listingID: ', req.params.listingID)
	const query = `SELECT * from listings WHERE id = ?`;
	const params = [req.params.listingID];

	db.execute(query, params, { prepare: true })
		.then(data => res.status(200).send(data.rows));
	// var id = req.params.listingID
	// db.findDesc(id,(err,data)=>{
	//     if(err){
	//         res.status(500).send(err);
	//     } else {
	//         // console.log(data)
	//         if (data.length) {
	//             res.json(data[0])
	//         } else {
	//             res.status(500)
	//         }
	//     }        
	// })
})

app.get('/listing/amenity/:listingID',(req,res)=>{

	console.log('req.params.listingID: ', req.params.listingID)
	const query = `SELECT * from amenities WHERE id = ?`;
	const params = [req.params.listingID];

	db.execute(query, params, { prepare: true })
		.then(data => res.status(200).send(data.rows));

	// var id = req.params.listingID
	// db.findAmen(id,(err,data)=>{
	// 		if(err){
	// 				res.status(500).send(err);
	// 		} else {
	// 				if (data.length) {
	// 						res.json(data[0])
	// 				} else {
	// 						res.status(500)
	// 				}
	// 		}
	// })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
module.exports = app;