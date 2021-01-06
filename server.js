import express from 'express';
import mongoose from 'mongoose';
import session from "express-session";
import connectStore from "connect-mongo";
import {userRoutes, cartRoutes, wishRoutes, orderRoutes} from './routes/index';
import sessionRoutes from './routes/session';
import bookRouter from "./routes/book";
import {MONGO_URI, NODE_ENV, PORT, SESS_LIFETIME, SESS_NAME, SESS_SECRET} from './config';


(async () => {
    try {
        await mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log('Connection to MongoDB Established!!');

        const app = express();
        const MongoStore = connectStore(session);

        app.disable('x-powered-by');
        app.use(function (req, res, next) {
            let whitelist = [
                'http://localhost:3000',
                'http://localhost:3001',
                'https://webdev-project-team17.herokuapp.com',
                'https://frontend-bookbar.herokuapp.com',
                'https://test-front-end-1.herokuapp.com',
                '*'
            ];
            let origin = req.headers.origin;
            if (whitelist.indexOf(origin) > -1) {
                res.setHeader('Access-Control-Allow-Origin', origin);
            }
            res.header("Access-Control-Allow-Headers",
                       "Origin, X-Requested-With, Content-Type, Accept");
            res.header("Access-Control-Allow-Methods",
                       "GET, POST, PUT, DELETE, OPTIONS");
            res.header("Access-Control-Allow-Credentials", "true");
            next();
        });
        app.use(express.urlencoded({extended: true}));
        app.use(express.json());
        app.use(session({
                            name: SESS_NAME,
                            secret: SESS_SECRET,
                            saveUninitialized: false,
                            resave: false,
                            store: new MongoStore({
                                                      mongooseConnection: mongoose.connection,
                                                      collection: 'session',
                                                      ttl: parseInt(SESS_LIFETIME) / 1000
                                                  }),
                            cookie: {
                                sameSite: true,
                                secure: NODE_ENV === 'production',
                                maxAge: parseInt(SESS_LIFETIME)
                            }
                        }));

        const apiRouter = express.Router();
        app.use('/api', apiRouter);
        apiRouter.use('/users', userRoutes);
        apiRouter.use('/session', sessionRoutes);
        apiRouter.use('/book', bookRouter);
        apiRouter.use('/cart', cartRoutes);
        apiRouter.use('/wish', wishRoutes);
        apiRouter.use('/order', orderRoutes);

        app.listen(process.env.PORT || PORT, () => console.log(`Listening on port ${PORT}`));
    } catch (err) {
        console.log(err)
    }
})();
