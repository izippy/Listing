//database


const mongoose = require('mongoose');
// mongoose.connect('mongodb://database:27017/house',{ useNewUrlParser: true } )
// mongoose.connect('mongodb://172.17.0.2:27017/house',{ useNewUrlParser: true } )
mongoose.connect('mongodb://localhost:27017/house',{ useNewUrlParser: true } )

var descSchema = mongoose.Schema({
    id: {type:Number, uniqe:true},
    title: String,
    location: String,
    host: {},
    detail:{},
    highlights: {},
    desc: {},
});

var Desc = mongoose.model('Desc',descSchema);


var amenitySchema = mongoose.Schema({
    id: {type:Number, uniqe:true},
    amenities: {}
});
var Amenity = mongoose.model('Amenity',amenitySchema);

var findDesc = (num, callback) =>{
    Desc.find({id:num})
        .exec((err,data)=>{
            callback(err,data)
        })
}
var findAmen = (num, callback) =>{
    Amenity.find({id:num})
        .exec((err,data)=>{
            callback(err,data)
        })
}
module.exports.Desc = Desc;
module.exports.Amenity = Amenity;
module.exports.findDesc = findDesc;
module.exports.findAmen = findAmen;
module.exports.mongoose = mongoose;