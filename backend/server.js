const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const offerRoutes = express.Router();
const contactRoutes = express.Router();

const config = require('../config/config');
let Offer = require('./models/Offer');
let Contact = require('./models/Contact');

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

offerRoutes.route('/').get(function(req, res) {
    Offer.find(function(err, offers) {
        if (err) {
            console.log(err);
        } else {
            res.json(offers);
        }
    });
});

offerRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Offer.findById(id, function(err, offer) {
        res.json(offer);
    });
});

offerRoutes.route('/update/:id').post(function(req, res) {
    Offer.findById(req.params.id, function(err, offer) {
        if (!offer)
            res.status(404).send("data is not found");
        else
        offer.offerName = req.body.offerName;
        offer.countryName = req.body.countryName;
        offer.startDate = req.body.startDate;
        offer.endDate = req.body.endDate;
        offer.numberPeople = req.body.numberPeople;
        offer.cost = req.body.cost;
        offer.availability = req.body.availability;

        offer.save().then(offer => {
            res.json('Offer is updated!');
        })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

offerRoutes.route('/add').post(function(req, res) {
    let offer = new Offer(req.body);
    offer.save()
        .then(offer => {
            res.status(200).json({'offer': 'Offer added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new Offer failed');
        });
});

offerRoutes.route('/delete/:id').delete(function(req,res){
    Offer.findByIdAndRemove(req.params.id, function (err) {
        if (err) return (err);
        res.send('Deleted successfully!');
    })
});

app.use('/offers' ,offerRoutes);
//CONTACT


contactRoutes.route('/add').post(function(req, res) {
    let contact = new Contact(req.body);
    contact.save()
        .then(review => {
            res.status(200).json({'Contact': 'Messaged sent successfully'});
        })
        .catch(err => {
            res.status(400).send('Fail with adding');
        });
});
app.use('/contact', contactRoutes);
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});