import React, { Component } from 'react';
import axios from 'axios';
export default class updateOffer extends Component {

    constructor(props) {
        super(props);

        this.onChangeOfferName = this.onChangeOfferName.bind(this);
        this.onChangeCountryName = this.onChangeCountryName.bind(this);
        this.onChangeStartDate = this.onChangeStartDate.bind(this);
        this.onChangeEndDate = this.onChangeEndDate.bind(this);
        this.onChangeNumberPeople = this.onChangeNumberPeople.bind(this);
        this.onChangeCost = this.onChangeCost.bind(this);
        this.onChangeAvailability = this.onChangeAvailability.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            offerName: '',
            countryName: '',
            startDate: '',
            endDate: '',
            numberPeople: '',
            cost: '',
            availability: ''
        }
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

    onChangeOfferName(e) {
        this.setState({
            offerName: e.target.value
        });
    }

    onChangeCountryName(e) {
        this.setState({
            countryName: e.target.value
        });
    }

    onChangeStartDate(e)
    {
        this.setState({
            startDate: e.target.value
        });
    }
    onChangeEndDate(e)
    {
        this.setState({
            endDate: e.target.value
        });
    }
    onChangeNumberPeople(e)
    {
        this.setState({
            numberPeople: e.target.value
        });
    }

    onChangeCost(e) {
        this.setState({
            cost: e.target.value
        });
    }

    onChangeAvailability(e) {
        this.setState({
            availability: e.target.value
        });
    }

    onSubmit(e) {
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
        axios.post('http://localhost:4000/offers/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('/travel');
        window.location.reload(false);
    }

    render() {
        return (
            <div>
                <h3 align="center">Update Offer</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name of Offer: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.offerName}
                                onChange={this.onChangeOfferName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Name of Country: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.countryName}
                                onChange={this.onChangeCountryName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Cost [PLN]: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.cost}
                            onChange={this.onChangeCost}
                        />
                    </div>
                    <div className="form-group">
                        <label>Start Date: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.startDate}
                                onChange={this.onChangeStartDate}
                        />
                    </div>
                    <div className="form-group">
                        <label>End Date: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.endDate}
                                onChange={this.onChangeEndDate}
                        />
                    </div>
                    <div className="form-group">
                        <label>Number of People: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.numberPeople}
                                onChange={this.onChangeNumberPeople}
                        />
                    </div>
                    <div className="form-group">
                        <label>Availability: </label>
                        <br></br>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="availabilityOption"
                                    id="availabilityTrue"
                                    value="True"
                                    checked={this.state.availability==='True'}
                                    onChange={this.onChangeAvailability}
                            />
                            <label className="form-check-label">True</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="availabilityOption"
                                    id="availabilityFalse"
                                    value="False"
                                    checked={this.state.availability==='False'}
                                    onChange={this.onChangeAvailability}
                            />
                            <label className="form-check-label">False</label>
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Update Offer" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}