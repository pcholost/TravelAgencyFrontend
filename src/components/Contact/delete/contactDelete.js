import React, { Component } from 'react';
import axios from 'axios';

export default class contactDelete extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);

    }
    componentDidMount() {
        axios.get('http://localhost:4000/contact/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    nickname: response.data.nickname,
                    postedDate: response.data.postedDate,
                    email: response.data.email,
                    body: response.data.body
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
            postedDate: this.state.postedDate,
            email: this.state.email,
            body: this.state.body
        };
        console.log(obj);
        axios.delete('http://localhost:4000/contact/delete/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('/contact');
    }
    render()
    {
        return (
            <div>
                <h3 align="center">Delete Existing Message</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input type="submit" value="Delete Message" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}