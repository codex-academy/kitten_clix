
module.exports = function(models){
    const Kitten = models.Kitten;

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

        Kitten.findOne({name : kittenName}, function(err, kitten){
            kitten.likes++;
            kitten.save(function(err, result){
                res.redirect("/");
            });
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
