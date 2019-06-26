import React, { Component } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

const ContactRead = props => (
    <tr>
        <td>{props.contact.nickname}</td>
        <td>{props.contact.email}</td>
        <td>{props.contact.postedDate}</td>
        <td>{props.contact.body}</td>

        <td>
            <Link to={"contact/delete/"+props.contact._id}>Delete </Link>
        </td>
    </tr>
)

class contact extends Component{
    constructor(props) {
        super(props);
        this.state = {contacts: []};
        this.handleChange=this.handleChange.bind(this);
    }

    handleChange(e){
        this.setState({[e.target.name]:e.target.value});
    }

    componentDidMount() {
        axios.get('http://localhost:4000/contact/')
            .then(response => {
                this.setState({ contacts: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    messageList() {
        return this.state.contacts.map(function(currentMessage, i){
            return <ContactRead contact={currentMessage} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3>MailBox </h3>
                <table className="table table-bordered" style={{ marginTop: 20 }} >
                    <thead>
                    <tr>
                        <th>Nickname</th>
                        <th>Email</th>
                        <th>Data</th>
                        <th>Message</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.messageList() }
                    </tbody>
                </table>
            </div>
        )
    }

}
export default contact;