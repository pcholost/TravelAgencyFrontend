import React, { Component } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

const Reviews = props => (
    <tr>
        <td>{props.review.nickname}</td>
        <td>{props.review.postedDate}</td>
        <td>{props.review.body}</td>
        <td>{props.review.rating}</td>

        <td>
            <Link to={"review/delete/"+props.review._id}>Delete </Link>
        </td>
    </tr>
)

class reviewsRead extends Component{
    constructor(props) {
        super(props);
        this.state = {reviews: []};
        this.handleChange=this.handleChange.bind(this);
    }

    handleChange(e){
        this.setState({[e.target.name]:e.target.value});
    }

    componentDidMount() {
        axios.get('http://localhost:5000/reviews/')
            .then(response => {
                this.setState({ reviews: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    reviewList() {
        return this.state.reviews.map(function(currentReview, i){
            return <Reviews review={currentReview} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Reviews </h3>
                <table className="table table-bordered" style={{ marginTop: 20 }} >
                    <thead>
                    <tr>
                        <th>Nickname</th>
                        <th>Date</th>
                        <th>Body</th>
                        <th>Rating [1-5]</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.reviewList() }
                    </tbody>
                </table>
            </div>
        )
    }

}


export default reviewsRead;