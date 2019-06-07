import React, { Component } from 'react';
import Logo from "../../img/logo.png";

export default class aboutCompany extends Component {

    render() {
        return (
            <div>
                <img src={Logo} width="30%" height="30%" />
                <br></br>
                <br></br>
                <p><i>We are a small company but we want to be as good as Trivago...</i></p>
            </div>
        )
    }
}