const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const port = process.env.PORT || 3000;
app.set('port',port);
server.listen(3000, '192.168.1.36' || 'localhost', function(){
    console.log('Aplication de NodeJS ' + port + ' iniciada...')
});