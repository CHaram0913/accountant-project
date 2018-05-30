const { User } = require('./../models/users');
const passport = require('passport');

module.exports = app => {
    // app.get('/api/user/create_account', (req, res) => {
    //     if (req.session.passport) {
    //         res.redirect('/');
    //     }
    //     res.sendFile(__dirname + '/public/create_account.html');
    // });

    app.post('/api/user/create_account', async (req, res) => {
        try {
            let newUser = new User ({
                email: req.body.email,
                password: req.body.password
            });

            let result = await newUser.save();
    
            if (!result) {
                throw new Error('invalid email or password');
            } else {
                res.send('success')
                //res.redirect('/user/login');
            }
        } catch (e) {
            res.send(e.message);
        }
    });

    // app.get('/api/user/login', (req, res) => {
    //     if (req.session.passport) {
    //         res.redirect('/');
    //     }
    //     res.sendFile(__dirname + '/public/login.html');
    // });

    const logInMiddleware = (req, res, next) => {
        passport.authenticate('local', function(err, user, info) {
            if (err) {
                req.body.error = err;
                return next();
            } else {
                if (info) {
                    req.body.error = info.message;
                    return next();
                } else {
                    req.logIn(user, function(err) {
                        if (err) {
                            req.body.error = err;
                            return next();
                        } else {
                            req.body.user = user;
                            return next();
                        }
                    });
                }
            }
        })(req, res, next);
    };

    app.post('/api/user/login', logInMiddleware, (req, res) => {
        if (req.body.user) {
            res.send('success')
            //res.redirect('/');
        } else {
            res.send(req.body.error);
        }
    });

    // app.get('/user/log_out', (req, res) => {
    //     req.session.destroy();
    //     res.redirect('/user/login');
    // });
}