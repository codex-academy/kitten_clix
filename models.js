var mongoose = require('mongoose');

module.exports = function(mongoUrl){

    mongoose.connect(mongoUrl);

    var Kitten = mongoose.model('Kitten', {
        name: String,
        color : String,
        likes : Number
    });

    var KittenLike = mongoose.model('KittenLike', {
        kittenName: String,
        likedBy : Number
    });

     return {
        Kitten,
        KittenLike
    }
}
