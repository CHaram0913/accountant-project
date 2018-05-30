const { User } = require('./../models/users');

module.exports = app => {
    app.post('/api/user/create_account', async (req, res) => {
        try {
            //CHECK!
            let newUser = {
                email: req.body.email,
                password: req.body.password
            };

            let doc = await User.save(newUser);

            res.send(doc);

        } catch(e) {

            res.status(400).send(e);
        }
    });

    app.post('/api/user/login', async (req, res) => {
        try {
            passport.authenticate('local', {
                successRedirect: '/api/',
                failureRedirect: '/api/user/login',
                failureFlash: ture
            })
        } catch(e) {

        }
    })
}