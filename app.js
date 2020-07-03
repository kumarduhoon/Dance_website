const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
const port = 8080;
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dance', { useNewUrlParser: true });


const contactSchema = new mongoose.Schema({
    Name: String,
    Gender: String,
    Email: String,
    Phone: String,
    Address: String,
    Desc: String,
    ReffernceName: String

});

const contact = mongoose.model('contact', contactSchema);

// static file access by middleware
app.use('/', express.static('static'));

app.use(express.urlencoded());
app.set('view engin', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params);

})
app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params);

})

app.post('/contact', (req, res) => {
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send('Data is send to the database');
    }).catch(()=>{
        res.status(404).send("data is not save to the database");
    })
    

})

app.listen(port, () => {
    console.log('I am working.... lol');
})