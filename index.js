const express = require('express');
const app     = express();
const path    = require('path');

const data    = require('./data/adminPanel.json');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (rea, res) => res.render('index', data));
app.listen(3000, _ => {
	console.log( 'Listen port 3000' )
});



