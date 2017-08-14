
module.exports = function(models){
    const Kitten = models.Kitten;
    const KittenLike = models.KittenLike;

    const index = function(req, res){
        Kitten.find({}, function(err, kittens){
            res.render('kitten/kittens', {kittens});
        });
    };

    const addScreen = function(req, res){
        res.render("kitten/add");
    }

    const add = function(req, res){
        let kitten = new Kitten({
            name : req.body.name,
            color : req.body.color,
            likes : 0
        });
        kitten.save(function(err, kitten){
            res.redirect("/");
        });
    }

    const light = function(req, res){
        lightStatus = req.body.status;
        req.flash('info', `Light status now: ${lightStatus}`);
        res.redirect('/');
    }

    const like = function(req, res, next){
        let kittenName = req.params.kittenName;

        if (!req.session.username){
            return res.redirect("/login");
        }

        let kittenUserData = {
            kittenName : kittenName,
            username : req.session.username
        };

        KittenLike.findOne(kittenUserData, function(err, kittenLike){

            if (kittenLike){
                //Remove the kitten like entry
                kittenLike.remove(function(err){
                    //Find the kitten
                    Kitten.findOne({name : kittenName}, function(err, kitten){
                        //decrement the likes
                        kitten.likes--;
                        //save the kitten!
                        kitten.save(function(err, result){
                            res.redirect("/");
                        });
                    });
                })
            }
            else {
                let theKittenLike = new KittenLike(kittenUserData);
                theKittenLike.save(function(err, theLike){
                    Kitten.findOne({name : kittenName}, function(err, kitten){
                        //decrement the likes
                        kitten.likes++;
                        //save the kitten!
                        kitten.save(function(err, result){
                            res.redirect("/");
                        });
                    });
                });
            }
        });
    };

    return {
        add,
        addScreen,
        index,
        light,
        like
    }
}
