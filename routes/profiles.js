var bcrypt = require('bcrypt');

module.exports = function(express, query, db) {
    var router = express.Router();

    router.post('/getProfile', function(request, response) {
        if (request.user) {
          if (request.body.username) {
            var profileData = db.profiles.getProfile(query, request.body.username, function(err, userData) {
                if (err) {
                    console.error(err);
                } else {
                    response.status(200).send(userData);
                }
            });
          }
        } else {
            response.redirect('/');
        }
    });
    
    router.post('/updateProfileSettings', function(request, response) {
        
        if (request.user){
            db.profiles.updateCountry(query, request.user.username, request.body.country, function(err, result){
                if (err){
                    console.log(err);
                    response.end("false");
                } else{
                    db.listings.updateBuyerLoc(query, request.user.username, request.body.country, function(err, result){
                        if (err){
                            console.log(err);
                            response.end("false");
                        } else{
                            response.end("true");
                        }
                    });
                }
                
            });
        }
        else{
            response.redirect('/');
        }
    });

    router.post('/upgrade', function(request, response) {
        if (request.user) {
          if (request.body.username) {
            var profileData = db.profiles.upgrade(query, request.body.username, function(err, userData) {
                if (err) {
                    console.error(err);
                } else {
                    response.status(200).send(userData);
                }
            });
          }
        } else {
            response.redirect('/');
        }
    });
    
    router.post('/updateAccountSettings', function(request, response){
        if(request.body.newEmail){
            if(request.body.newPass === "true"){
                //new email and pass
                db.users.updateEmail(query, request.user.username, request.body.newEmail, function(err, result){
                    if (err){
                        console.log(err);
                        response.end("false");
                        return;
                    } else {
                        db.users.getPassHash(query, request.user.username, function(err, result2){
                            if(bcrypt.compareSync(request.body.currentPassword, result2[0].password_hash)){
                                db.users.updatePass(query, request.user.username, request.body.newPassword, function(err, result3){
                                    if (err) {
                                        console.log(err);
                                        response.end("false");
                                        return;                                 
                                    } else{
                                        response.end("true");
                                        return;
                                    }
                                });
                            }
                            else{
                                response.end("badPassword");
                                return;
                            }
                        });
                        
                    }
                });
            }
            else{
                //new email
                db.users.updateEmail(query, request.user.username, request.body.newEmail, function(err, result){
                    if (err){
                        console.log(err);
                        response.end("false");
                    } else {
                        response.end("true");
                    }
                });
            }
        }
        else{
            //new password
            db.users.getPassHash(query, request.user.username, function(err, result){
                if(bcrypt.compareSync(request.body.currentPassword, result[0].password_hash)){
                    db.users.updatePass(query, request.user.username, request.body.newPassword, function(err, result2){
                        if (err) {
                            console.log(err);
                            response.end("false");
                            return;                                 
                        } else{
                            response.end("true");
                            return;
                        }
                    });
                }
                else{
                    response.end("badPass");
                    return;
                }
            });
        }
    });
    
    router.post('/getUserEmail', function(request, response){
        if (request.user){
            db.users.getEmail(query, request.body.username, function(err, result){
                if (err){
                    console.log(err);
                    response.end("false");
                    return;
                } else{
                    if(!result[0].email){
                        console.log(err);
                        response.end("false");
                        return;                        
                    } else{
                        response.end(result[0].email);
                    }
                }
            });
        }
        else{
            response.redirect('/');
        }
    });

    return router;
}
