import express from "express";
import { engine } from 'express-handlebars';
import mongoose from "mongoose";

import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import sessionsRouter from './routes/sessions.router.js'
import viewsRouter from './routes/views.router.js'

import cookieParser from "cookie-parser"
import session from "express-session";
import MongoStore from "connect-mongo";

const app = express();

mongoose.connect('mongodb+srv://matiasdelorenc:RKzplLYLp5xCGCGk@universalcluster.3fc0vde.mongodb.net/?retryWrites=true&w=majority&appName=UniversalCluster')

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
    store:MongoStore.create({
        mongoUrl:'mongodb+srv://matiasdelorenc:RKzplLYLp5xCGCGk@universalcluster.3fc0vde.mongodb.net/?retryWrites=true&w=majority&appName=UniversalCluster',
        mongoOptions:{useNewUrlParser:true,useUnifiedTopology:true},
    }),
    secret:"asd3ñc3okasod",
    resave:false,
    saveUninitialized:false
}))

app.use('/api/products', productsRouter); // Aplica el middleware de autenticación solo a rutas que lo necesiten

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use('/api/products', productsRouter);
app.use('/api/cart', cartsRouter)
app.use('/api/sessions', sessionsRouter)
app.use('/', viewsRouter)


app.listen(8080,()=>console.log("Listening on PORT 8080"))