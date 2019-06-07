import React, { Component } from 'react';
import axios from 'axios';

export default class CreateReview extends Component {

    constructor(props) {
        super(props);

        this.onChangeNickname = this.onChangeNickname.bind(this);
        this.onChangeRating = this.onChangeRating.bind(this);
        this.onChangeBody = this.onChangeBody.bind(this);
        this.onChangePostedDate = this.onChangePostedDate.bind(this);

        this.state = {
            nickname: '',
            postedDate: Date.now(),
            body: '',
            rating: ''
        }
    }
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

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Add new Review!</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Your nickname: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.nickname}
                                onChange={this.onChangeNickname}
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
                    <div className="form-group">
                        <label>Rating[1-5]: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.rating}
                                onChange={this.onChangeRating}
                        />
                    </div>
                    <div className="form-group">
                        <label>Write about experience: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.body}
                            onChange={this.onChangeBody}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Review" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}