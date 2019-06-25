import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import CrudPanel from "../Crud/crudApp";
import HomePage from "../Content/adminHomePage";
import Footer from "../Footer/footer";
import Login from "../Login/login";
import About from "../Content/aboutCompany";
import ReviewPanel from "../ReviewCrud/reviewApp";
import Register from "../Register/register";

//import { Provider } from "react-redux";
//import store from "../Store/store";

import logo from "../../img/logo.png";

class App extends Component{
    render(){
        return(
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
                <Footer/>
            </div>
            </Router>
        );
    }
}

export default App;