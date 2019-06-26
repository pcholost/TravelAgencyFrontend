import React, { Component } from 'react';
import axios from 'axios';
import { FormErrors } from '../../Error/formErrors';

export default class CreateReview extends Component {

    constructor(props) {
        super(props);

        this.onChangeNickname = this.onChangeNickname.bind(this);
        this.onChangeRating = this.onChangeRating.bind(this);
        this.onChangeBody = this.onChangeBody.bind(this);
        this.onChangePostedDate = this.onChangePostedDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            nickname: '',
            postedDate: Date.now(),
            body: '',
            rating: '',

            formErrors: {nickname: '', body: '', rating: ''},
            nicknameValid: false,
            bodyValid: false,
            ratingValid: false,
            formValid: false
        }
    }
    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},
            () => { this.validateField(name, value) });
    };
    onChangeNickname(e) {
        this.setState({
            nickname: e.target.value
        });
    }

    onChangeRating(e) {
        this.setState({
            rating: e.target.value
        });
    }

    onChangeBody(e)
    {
        this.setState({
            body: e.target.value
        });
    }
    onChangePostedDate(e) {
        this.setState({
            postedDate: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        console.log(`Review submitted:`);
        console.log(`Nickname: ${this.state.nickname}`);
        console.log(`Date: ${Date.now()}`);
        console.log(`Body: ${this.state.body}`);
        console.log(`Rating: ${this.state.rating}`);


        const newReview = {
            nickname: this.state.nickname,
            rating : this.state.rating,
            body: this.state.body,
            postedDate: Date.now(),
        };

        axios.post('http://localhost:5000/reviews/add', newReview)
            .then(res => console.log(res.data));

        this.setState({
            nickname: '',
            postedData: Date.now(),
            body: '',
            rating: ''
        })

    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let nicknameValid = this.state.nicknameValid;
        let bodyValid = this.state.bodyValid;
        let ratingValid = this.state.ratingValid;

        switch(fieldName) {
            case 'nickname':
                nicknameValid = value.length >= 2;
                fieldValidationErrors.nickname = nicknameValid ? '' : ': Nickname is too short';
                break;
            case 'body':
                bodyValid = value.length >= 6;
                fieldValidationErrors.body = bodyValid ? '': ': Review is too short';
                break;
            case 'rating':
                ratingValid = value >= 1 && value<=5;
                fieldValidationErrors.rating = ratingValid ? '': ': Rating must be between 1 to 5';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            nicknameValid: nicknameValid,
            bodyValid: bodyValid,
            ratingValid: ratingValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.nicknameValid && this.state.bodyValid && this.state.ratingValid});
    }

    errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Add new Review!</h3>
                <div className="panel panel-default">
                    <FormErrors formErrors={this.state.formErrors} />
                </div>
                <form onSubmit={this.onSubmit}>
                    <div className={`"form-group" ${this.errorClass(this.state.formErrors.nickname)}`}>
                        <label>Your nickname: </label>
                        <input  type="text"
                                className="form-control"
                                name="nickname"
                                value={this.state.nickname}
                                onChange={this.handleUserInput}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <input
                            type="Date"
                            className="form-control"
                            value={this.state.postedDate}
                            onChange={this.onChangePostedDate}
                        />
                    </div>
                    <div className={`form-group ${this.errorClass(this.state.formErrors.rating)}`}>
                        <label>Rating[1-5]: </label>
                        <input  type="text"
                                className="form-control"
                                name="rating"
                                value={this.state.rating}
                                onChange={this.handleUserInput}
                        />
                    </div>
                    <div className={`form-group ${this.errorClass(this.state.formErrors.body)}`}>
                        <label>Write about experience: </label>
                        <input
                            type="text"
                            className="form-control"
                            name="body"
                            value={this.state.body}
                            onChange={this.handleUserInput}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Review" className="btn btn-primary"  disabled={!this.state.formValid}/>
                    </div>
                </form>
            </div>
        )
    }
}