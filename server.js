const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');


const port = process.env.PORT || 3000;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());
app.disable('x-powered-by');

app.set('port',port);
server.listen(3000, '192.168.1.36' || 'localhost', function(){
    console.log('Aplication de NodeJS ' + port + ' iniciada...')
});
app.get('/', (req, res)=> {
    res.send('ruta raiz del backend');
});
app.get('/test', (req, res)=> {
    res.send('bienvenido a la ruta de test');
});
//ERROR HANDLER
app.use((err, req, res, next) => {
    console.log(err);
    resizeTo.status(err.status || 500).send(err.stack);
});