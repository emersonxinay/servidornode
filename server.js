const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');

/*
*RUTAS
*/
const users = require('./routes/usersRoutes');


const port = process.env.PORT || 3000;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());
app.disable('x-powered-by');

app.set('port', port);
/*
* LLAMANDO A LAS RUTAS
*/
users(app);
server.listen(3000, '192.168.0.2' || 'localhost', function(){
    console.log('Aplication de NodeJS ' + port + ' iniciada...')
});

//ERROR HANDLER
app.use((err, req, res, next) => {
    console.log(err);
    resizeTo.status(err.status || 500).send(err.stack);
});
module.exports = {
    app: app,
    server: server
}
// 200 - es una respuesta exitosa 
//404 -significa que la url no existe 
//500 - error interno del servidor 
