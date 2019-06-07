import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    InputGroupAddon,
    Button,
    InputGroup,
    Input
} from 'reactstrap';

import CrudPanel from "../Crud/crudApp";
import HomePage from "../Content/adminHomePage";
import Footer from "../Footer/footer";
import Login from "../Login/login";
import Search from "../Filter/Filter";
import About from "../Content/aboutCompany";
import ReviewPanel from "../ReviewCrud/reviewApp"

import logo from "../../img/logo.png"

const navBarStyle = {
    background: "rgba(0, 0, 102, 0.7)",
    marginBottom: "50px"
};



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
                                <Link to="/search" className="nav-link">Search</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/login" className="nav-link">Login</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/about" className="nav-link">About</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/review" className="nav-link">Reviews</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <br/>
                <Route path="/" exact component={HomePage}/>
                <Route path="/travel" component={CrudPanel}/>
                <Route path="/login" component={Login}/>
                <Route path="/search" component={Search}/>
                <Route path="/about" component={About}/>
                <Route path="/review" component={ReviewPanel}/>
                <Footer/>
            </div>
            </Router>
        );
    }
}

export default App;