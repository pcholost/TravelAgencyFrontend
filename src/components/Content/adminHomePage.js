import React, { Component } from 'react';
import OfferList from "../../img/paryz.jpg"
import AddOffer from "../../img/zachod.jpg"

export default class HomePage extends Component {
    render() {
        return (
            <div>
                <h2>Welcome to Travelingo !</h2>
                <p>Stop dreaming about holiday trip</p>
                <p><i>Look on our special offer specially for YOU!</i></p>
                <br></br>
                <h3>Choose your Admin Option: </h3>
                <a href="/travel">
                    <img src={OfferList} width="320" height="160"/>
                </a>
                <br></br>
                <br></br>
                <a href="/travel/create">
                    <img src={AddOffer} width="320" height="160"/>
                </a>
            </div>
        )
    }
}