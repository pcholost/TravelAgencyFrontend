import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../Store/actions/authActions";
class Dashboard extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };
    render() {
        const { user } = this.props.auth;
        return (
            <div style={{ height: "75vh" }} className="container valign-wrapper">
                <div className="row">
                    <div className="col s12 center-align" >
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <h4>
                                Hey there, {user.name.split(" ")[0]}
                                <p className="flow-text grey-text text-darken-1">
                                    You are logged into a Travellingo.
                                </p>
                                <br/>
                                <p className="flow-text grey-text text-darken-1">
                                    Now you have access to our Offer Database
                                </p>
                            </h4>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <button
                                style={{
                                    width: "150px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginTop: "1rem"
                                }}
                                onClick={this.onLogoutClick}
                                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(Dashboard);