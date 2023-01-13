const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
mongoose.set('strictQuery', true)
mongoose.connect("mongodb+srv://Sakshi:monday123@cluster0.z5dpz2x.mongodb.net/project-1",{useNewUrlParser: true})
.then(() =>console.log("MongoDb is connected"))
.catch(err => console.log(err))

app.use('/',route)

app.post('/test-me', function(){
    console.log('SERVER is running ok')
})

app.listen(3000, function(){
    console.log('Express app running on port' + (3000))
});