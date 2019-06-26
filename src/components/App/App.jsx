import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import jwt_decode from "jwt-decode";
import setAuthToken from "../Store/utils/setAuthToken";
import { setCurrentUser, logoutUser } from "../Store/actions/authActions";

import { Provider } from "react-redux";
import store from "../Store/store";

import CrudPanel from "../Crud/crudApp";
import HomePage from "../Content/adminHomePage";
import Footer from "../Footer/footer";
import Login from "../Login/login";
import About from "../Content/aboutCompany";
import ReviewPanel from "../ReviewCrud/reviewApp";
import Register from "../Register/register";
import PrivateRoute from "../PrivateRoute/privateRoute";
import Dashboard from "../Dashboard/dashboard";
import Contact from "../Contact/contactRoute";

import logo from "../../img/logo.png";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
    // Set auth token header auth
    const token = localStorage.jwtToken;
    setAuthToken(token);
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));
// Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutUser());
        // Redirect to login
        window.location.href = "./login";
    }
}

class App extends Component{
    render(){
        return(
            <Provider store={store}>
            <Router>
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="/">
                        <img src={logo} width="130" height="30" />
                    </a>
                    <div className="collpase navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/" className="nav-link">Home</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/travel" className="nav-link">Offer Database</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/review" className="nav-link">Reviews</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            <li className="navbar-item">
                                <Link to="/about" className="nav-link">About</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/contact" className="nav-link">Messages</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/login" className="nav-link">Login</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <br/>
                <Route path="/" exact component={HomePage}/>
                <Route path="/travel" component={CrudPanel}/>
                <Route path="/login" component={Login}/>
                <Route path="/about" component={About}/>
                <Route path="/review" component={ReviewPanel}/>
                <Route path="/register" component={Register}/>
                <PrivateRoute path="/contact" component={Contact}/>
                <Switch>
                    <PrivateRoute exact path="/dashboard" component={Dashboard} />
                </Switch>
                <Footer/>
            </div>
            </Router>
            </Provider>
        );
    }
}

export default App;