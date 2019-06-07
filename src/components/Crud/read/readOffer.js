import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Offers = props => (
    <tr>
        <td>{props.offer.offerName}</td>
        <td>{props.offer.countryName}</td>
        <td>{props.offer.startDate}</td>
        <td>{props.offer.endDate}</td>
        <td>{props.offer.numberPeople}</td>
        <td>{props.offer.cost}</td>
        <td>{props.offer.availability}</td>
        <td>
            <Link to={"travel/update/"+props.offer._id}>Update </Link>
            <Link to={"travel/delete/"+props.offer._id}>Delete </Link>

        </td>
    </tr>
);

export default class OffersList extends Component {

    constructor(props) {
        super(props);
        this.state = {offers: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/offers/')
            .then(response => {
                this.setState({ offers: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    offerList() {
        return this.state.offers.map(function(currentOffer, i){
            return <Offers offer={currentOffer} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Offer List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                    <tr>
                        <th>Offer name</th>
                        <th>Country name</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Number People</th>
                        <th>Cost</th>
                        <th>Availability</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.offerList() }
                    </tbody>
                </table>
            </div>
        )
    }
}