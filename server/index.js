//server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('../database')
const port = 3005;
const expressStaticGzip =require("express-static-gzip");

app.use(bodyParser.json());
app.use('/:listingID',express.static("public"));
// app.use('/:listingID', expressStaticGzip('public', {
//     enableBrotli: true,
//     orderPreference: ['br', 'gz'],
//     setHeaders: function (res, path) {
//        res.setHeader("Cache-Control", "public, max-age=31536000");
//     }
// }));

app.get('/listing/desc/:listingID',(req,res)=>{
    var id = req.params.listingID
    db.findDesc(id,(err,data)=>{
        if(err){
            res.status(500).send(err);
        } else {
            // console.log(data)
            if (data.length) {
                res.json(data[0])
            } else {
                res.status(500)
            }
        }        
    })
})
app.get('/listing/amenity/:listingID',(req,res)=>{
    var id = req.params.listingID
    db.findAmen(id,(err,data)=>{
        if(err){
            res.status(500).send(err);
        } else {
            if (data.length) {
                res.json(data[0])
            } else {
                res.status(500)
            }
        }
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
module.exports = app;