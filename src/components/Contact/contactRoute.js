import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import ReadContact from "./read/contactRead";
import DeleteContact from "./delete/contactDelete";

class ContactRoute extends Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">

                        <Link to="/contact" className="navbar-brand">Messages from users</Link>
                    </nav>
                    <br/>
                    <Route path="/contact" exact component={ReadContact} />
                    <Route path="/contact/delete/:id" component={DeleteContact} />
                </div>
            </Router>
        );
    }
}

export default ContactRoute;