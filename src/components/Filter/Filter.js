import React, { Component } from 'react';
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
    </tr>
);

export default class offersRead extends Component{
    constructor(props) {
        super(props);
        this.state = {
            search:'',
            offers: []};
    }

    updateSearch(e){
        this.setState({search:e.target.value.substr(0,20)});
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

    filteredList(){
        return this.state.offers.filter(
            (filt)=>
                filt.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
        ).map(function(currentOffer, i){
            return <Offers offer={currentOffer} key={i} />;
        })
    }

    render() {
        let filteredOffers = this.props.Offers;
        return (
            <div>
                <input type="text"
                       value={this.state.search}
                       onChange={this.updateSearch.bind(this)}
                       placeholder={'search by name'}/>

                <table className="table table-bordered" style={{ marginTop: 20 }} >
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
                    {this.filteredList()}
                    </tbody>
                </table>
            </div>


        )
    }
}