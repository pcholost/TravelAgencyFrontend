import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import CreateReview from "./create/createReview";
import ReadReview from "./read/readReview";
import DeleteReview from "./delete/deleteReview";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">

                        <Link to="/review" className="navbar-brand">Review about Travelingo</Link>
                        <div className="collpase navbar-collapse">
                            <ul className="navbar-nav mr-auto">
                                <li className="navbar-item">
                                    <Link to="/review/create" className="nav-link">Add Review</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <br/>
                    <Route path="/review" exact component={ReadReview} />
                    <Route path="/review/create" component={CreateReview} />
                    <Route path="/review/delete/:id" component={DeleteReview} />
                </div>
            </Router>
        );
    }
}

export default App;