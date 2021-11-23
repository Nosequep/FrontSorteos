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
app.use(express.static(__dirname + "views"));
app.get('/', (req, res) => {
    res.sendFile(__dirname+'/views/index.html');
});

//Starting the server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});
