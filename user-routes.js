module.exports = function(){

        let loginScreen = function(req, res){
            res.render("user/login");
        }

        let login = function(req, res){
            let username = req.body.username;
            if (username){
                req.session.username = username;
                res.redirect("/");
            }
            res.redirect("/login");
        }

        let logout = function(req, res, next){
            delete req.session.username;
            res.redirect("/");
        }


        return {
            login,
            logout,
            loginScreen
        }


}
