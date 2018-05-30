const express = require('express');
const mongoose = require('mongoose');
const expressSession = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const envResult = require('dotenv').config();
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;
const CONFIGS = process.env.ENV === 'prod' ?
    require('./configs/production') :
    process.env.ENV === 'dev' ?
        require('./configs/development') :
        require('./configs/default');

const { User } = require('./models/users');
const { Record } = require('./models/records');

/**
 * Logger Setting
 * */
const logger = createLogger({
    format: combine(
        // label({label:'label test'}),
        timestamp(),
        prettyPrint()
    ),
    transports: [new transports.Console()]
});

const app = express();

/**
 * Mongo Setup
 * */
mongoose.Promise = global.Promise;
mongoose.connect(CONFIGS.MONGO_URI);

/**
 * Middlewares
 * */
app.use(bodyParser.json());
app.use(expressSession({
    secret: CONFIGS.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: process.env.ENV === 'prod' ?
        {
            secure: true,
            maxAge: CONFIGS.SESSION_LIFE
        } :
        {
            maxAge: CONFIGS.SESSION_LIFE
        }
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
    async function (email, password, done) {
        try {
            let user = await User.findOne({ email });

            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            } else {
                if (!user.verifyPassword) {
                    return done(null, false, { message: 'Incorrect password.' });
                } else {
                    return done(null, user);
                }
            }
        } catch (e) {
            return done(e);
        }
    }
));

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (_id, done) {
    User.findById(_id, function(err, user) {
        done(err, user);
    });
});

app.get('/', (req, res) => {
    res.send('hi');
})

require('./routes/records')(app);
require('./routes/user')(app);

/**
 * Start
 * */
app.listen(CONFIGS.PORT, () => {
    logger.info(`Server Running at PORT : ${CONFIGS.PORT}`);
});