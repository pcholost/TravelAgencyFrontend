import React, { Component } from 'react';
import axios from 'axios';

export default class DeleteReview extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);

    }
    componentDidMount() {
        axios.get('http://localhost:5000/reviews/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    nickname: response.data.nickname,
                    rating: response.data.rating,
                    body: response.data.body,
                    postedData: response.data.postedData
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
            nickname: this.state.nickname,
            rating : this.state.rating,
            body: this.state.body,
            postedDate: Date.now(),
        };
        console.log(obj);
        axios.delete('http://localhost:5000/reviews/delete/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('/review');
    }
    render()
    {
        return (
            <div>
                <h3 align="center">Delete Existing Review</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input type="submit" value="Delete Review" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}