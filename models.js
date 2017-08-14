var mongoose = require('mongoose');

module.exports = function(mongoUrl){

    mongoose.connect(mongoUrl, {
        "useMongoClient" : true
    });

    var Kitten = mongoose.model('Kitten', {
        name: String,
        color : String,
        likes : Number
    });

    var KittenLike = mongoose.model('KittenLike', {
        kittenName: String,
        username : String
    });

     return {
        Kitten,
        KittenLike
    }
}
