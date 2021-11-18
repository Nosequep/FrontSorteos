const express = require('express');
const app = express();

const morgan = require('morgan');

//Settings 
app.set('port', 4000);

//middleware
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}));
app.use(express.json())

//routes
app.use(express.static(__dirname));
app.use('/api/sorteos', require('./src/routes/sorteos'));
app.use(express.static(__dirname + "/FrontSorteos/views"));
app.use(express.static(__dirname + "/FrontSorteos/components/crearSorteoForm.js"));
app.get('/', (req, res) => {
    res.sendFile(__dirname+'/FrontSorteos/views/index.html');
});

//console.log(__dirname + "../");

//Starting the server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});
