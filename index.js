const express = require('express');
const path = require('path');
require('dotenv').config();

// db config
require('./database/config').dbConnection();

// App de Express
const app = express();

// lectura y parseo del body
app.use(express.json());

// Node Server
const server = require('http').createServer(app);

// Path público
const publicPath = path.resolve( __dirname, 'public' );
app.use( express.static( publicPath ) );

// mis rutas
app.use('/api/login', require('./routes/auth'));
app.use('/api/tareas', require('./routes/tareas'));


server.listen( process.env.PORT, ( err ) => {

    if ( err ) throw new Error(err);

    console.log('Servidor corriendo en puerto', process.env.PORT );

});


