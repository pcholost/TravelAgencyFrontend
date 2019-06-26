import React, { Component } from 'react';
import axios from 'axios';
import { FormErrors } from '../../Error/formErrors';

export default class CreateOffer extends Component {

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
            availability: '',

            formErrors: {offerName: '', countryName: '', numberPeople: '', cost: ''},
            offerNameValid: false,
            countryNameValid: false,
            numberPeopleValid: false,
            costValid: false,
            formValid: false
        }
    }
    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},
            () => { this.validateField(name, value) });
    };
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

        console.log(`Offer submitted:`);
        console.log(`OfferName: ${this.state.offerName}`);
        console.log(`CountryName: ${this.state.countryName}`);
        console.log(`Start Date: ${this.state.startDate}`);
        console.log(`End Date: ${this.state.endDate}`);
        console.log(`Number of People: ${this.state.numberPeople}`);
        console.log(`Cost: ${this.state.cost}`);
        console.log(`Offer Availability: ${this.state.availability}`);

        const newOffer = {
            offerName: this.state.offerName,
            countryName : this.state.countryName,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            numberPeople: this.state.numberPeople,
            cost: this.state.cost,
            availability: this.state.availability
        };

        axios.post('http://localhost:4000/offers/add', newOffer)
            .then(res => console.log(res.data));

        this.setState({
            offerName: '',
            countryName: '',
            startDate: '',
            endDate: '',
            numberPeople: '',
            cost: '',
            availability: ''
        })
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let offerNameValid = this.state.offerNameValid;
        let countryNameValid = this.state.countryNameValid;
        let numberPeopleValid = this.state.numberPeopleValid;
        let costValid = this.state.costValid;

        switch(fieldName) {
            case 'offerName':
                offerNameValid = value.length >= 7;
                fieldValidationErrors.offerName = offerNameValid ? '' : ': must be above 7 characters';
                break;
            case 'countryName':
                countryNameValid = value.length >= 3;
                fieldValidationErrors.countryName = countryNameValid ? '': ': is too short';
                break;
            case 'numberPeople':
                numberPeopleValid = value >= 1 && value<=25;
                fieldValidationErrors.numberPeople = numberPeopleValid ? '': ': must be between 1 to 25';
                break;
            case 'cost':
                costValid = value >= 1 && value<=50000;
                fieldValidationErrors.cost = costValid ? '': ': must be between 1 to 50000';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            offerNameValid: offerNameValid,
            countryNameValid: countryNameValid,
            numberPeopleValid: numberPeopleValid,
            costValid: costValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.offerNameValid && this.state.countryNameValid && this.state.numberPeopleValid && this.state.costValid});
    }

    errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
    }


    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Create New Offer</h3>
                <div className="panel panel-default">
                    <FormErrors formErrors={this.state.formErrors} />
                </div>
                <form onSubmit={this.onSubmit}>
                    <div className={`"form-group" ${this.errorClass(this.state.formErrors.offerName)}`}>
                        <label>Name of Offer: </label>
                        <input  type="text"
                                className="form-control"
                                name="offerName"
                                value={this.state.offerName}
                                onChange={this.handleUserInput}
                        />
                    </div>
                    <div className={`form-group ${this.errorClass(this.state.formErrors.countryName)}`}>
                        <label>Name of Country: </label>
                        <input  type="text"
                                className="form-control"
                                name="countryName"
                                value={this.state.countryName}
                                onChange={this.handleUserInput}
                        />
                    </div>
                    <div className={`form-group ${this.errorClass(this.state.formErrors.cost)}`}>
                        <label>Cost [PLN]: </label>
                        <input
                            type="text"
                            className="form-control"
                            name="cost"
                            value={this.state.cost}
                            onChange={this.handleUserInput}
                        />
                    </div>
                    <div className="form-group">
                        <label>Start Date: </label>
                        <input  type="Date"
                                className="form-control"
                                value={this.state.startDate}
                                onChange={this.onChangeStartDate}
                        />
                    </div>
                    <div className="form-group">
                        <label>End Date: </label>
                        <input  type="Date"
                                className="form-control"
                                value={this.state.endDate}
                                onChange={this.onChangeEndDate}
                        />
                    </div>
                    <div className={`form-group ${this.errorClass(this.state.formErrors.numberPeople)}`}>
                        <label>Number of People: </label>
                        <input  type="text"
                                className="form-control"
                                name="numberPeople"
                                value={this.state.numberPeople}
                                onChange={this.handleUserInput}
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
                        <input type="submit" value="Create Offer" className="btn btn-primary" disabled={!this.state.formValid}/>
                    </div>
                </form>
            </div>
        )
    }
}