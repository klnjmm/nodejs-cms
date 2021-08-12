const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const path = require('path');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/cms', { useNewUrlParser: true, useUnifiedTopology: true }).then(db => {
    console.log('Connected to database');
}).catch(err => console.log('Error : '+err));

app.use(express.static(path.join(__dirname, 'public')));

// Configuration du template engine
app.engine('handlebars', handlebars({defaultLayout: 'home'}))

// Définition du template engine utilisé
app.set('view engine', 'handlebars');

const home = require('./routes/home/index');
const admin = require('./routes/admin/index');
const posts = require('./routes/admin/posts');

app.use('/', home);
app.use('/admin', admin);
app.use('/admin/posts', posts);

app.listen(9111, () => console.log('Listening on 9111'));
