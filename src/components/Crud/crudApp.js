import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import CreateOffer from "./create/createOffer";
import UpdateOffer from "./update/updateOffer";
import ReadOffer from "./read/readOffer";
import DeleteOffer from "./delete/deleteOffer";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">

                        <Link to="/travel" className="navbar-brand">Travel Offer Panel</Link>
                        <div className="collpase navbar-collapse">
                            <ul className="navbar-nav mr-auto">
                                <li className="navbar-item">
                                    <Link to="/travel/create" className="nav-link">Add Offer</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <br/>
                    <Route path="/travel" exact component={ReadOffer} />
                    <Route path="/travel/update/:id" component={UpdateOffer} />
                    <Route path="/travel/create" component={CreateOffer} />
                    <Route path="/travel/delete/:id" component={DeleteOffer} />
                </div>
            </Router>
        );
    }
}

export default App;