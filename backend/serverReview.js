const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const reviewRoutes = express.Router();
const PORT = 5000;
var config = require('../config/config');
let Review = require('./models/Review');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(config.mongoURI, { useNewUrlParser: true });

var mongoConnection = mongoose.connection;

mongoConnection.on('error', function(){
    throw new Error("Cannot connect to the database!")
});
mongoConnection.once('open', function() {
    console.log("Connected to the database!")
});

reviewRoutes.route('/').get(function(req, res) {
    Review.find(function(err, reviews) {
        if (err) {
            console.log(err);
        } else {
            res.json(reviews);
        }
    });
});

reviewRoutes.route('/add').post(function(req, res) {
    let review = new Review(req.body);
    review.save()
        .then(review => {
            res.status(200).json({'Review': 'Review added successfully'});
        })
        .catch(err => {
            res.status(400).send('Fail with adding');
        });
});

reviewRoutes.route('/delete/:id').delete(function(req,res){
    Review.findByIdAndRemove(req.params.id, function (err) {
        if (err) return (err);
        res.send('Deleted successfully!');
    })
});

reviewRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Review.findById(id, function(err, review) {
        res.json(review);
    });
});

app.use('/reviews', reviewRoutes);
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});