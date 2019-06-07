import React, { Component } from 'react';
import axios from 'axios';

export default class DeleteOffer extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);

    }
    componentDidMount() {
        axios.get('http://localhost:4000/offers/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    offerName: response.data.offerName,
                    countryName: response.data.countryName,
                    startDate: response.data.startDate,
                    endDate: response.data.endDate,
                    numberPeople: response.data.numberPeople,
                    cost: response.data.cost,
                    availability: response.data.availability
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }


    onSubmit(e)
    {
        e.preventDefault();
        const obj = {
            offerName: this.state.offerName,
            countryName: this.state.countryName,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            numberPeople: this.state.numberPeople,
            cost: this.state.cost,
            availability: this.state.availability
        };
        console.log(obj);
        axios.delete('http://localhost:4000/offers/delete/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('/travel');
    }
    render()
    {
        return (
            <div>
                <h3 align="center">Delete Existing Offer</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input type="submit" value="Delete Offer" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}