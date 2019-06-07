import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Modal, ModalHeader, ModalBody} from 'reactstrap';
import axios from 'axios';

const footerStyle = {
    width: "100%",
    height: "5%",
    background: "rgba(212, 217, 219, 0.7)",
    color: "black",
    marginBottom: '0px',
    marginTop: '30px',
    position: 'fixed',
    left: 0,
    bottom: 0,
};


class Footer extends Component {

    constructor(props) {
        super(props);
        this.onChangeNickname = this.onChangeNickname.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePostedDate = this.onChangePostedDate.bind(this);
        this.onChangeBody = this.onChangeBody.bind(this);
        this.state = {
            modalContactForm: false,
            nickname: '',
            email: '',
            postedDate: Date.now(),
            body: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleContactForm = this.toggleContactForm.bind(this);
    }

    onChangeNickname(e) {
        this.setState({
            nickname: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangeBody(e)
    {
        this.setState({
            body: e.target.value
        });
    }
    onChangePostedDate(e) {
        this.setState({
            postedDate: e.target.value
        });
    }


    handleSubmit(e) {
        e.preventDefault();

        console.log(`Review submitted:`);
        console.log(`Nickname: ${this.state.nickname}`);
        console.log(`Email: ${this.state.email}`);
        console.log(`Date: ${Date.now()}`);
        console.log(`Body: ${this.state.body}`);



        const newContact = {
            nickname: this.state.nickname,
            postedDate: Date.now(),
            rating : this.state.rating,
            body: this.state.body,

        };

        axios.post('http://localhost:5000/reviews/add', newContact)
            .then(res => console.log(res.data));

        this.setState({
            nickname: '',
            postedData: Date.now(),
            body: '',
            rating: ''
        })

    }

    toggleContactForm() {
        this.setState({
            modalContactForm: !this.state.modalContactForm
        });
    }


    render() {
        return (
            <footer className="footer" style={footerStyle}>

                {this.state.res && (
                    <div>
                        {alert(this.state.res)}
                    </div>
                )}
                <span onClick={this.toggleContactForm}>Contact with us</span>

                <Modal isOpen={this.state.modalContactForm} toggle={this.toggleContactForm} className={this.props.className}>
                    <ModalHeader toggle={this.toggleContactForm}>Contact Form</ModalHeader>
                    <ModalBody>
                        <Container>
                            <div className="text-center">
                                <form onSubmit={this.handleSubmit}>
                                    <Row >
                                        <Col>

                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <label htmlFor="username">Username: </label>
                                            <input id="username" name="username" type="text" />
                                        </Col>
                                        <Col>
                                            <label htmlFor="email">E-mail: </label>
                                            <input id="email" name="email" type="email" />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <label htmlFor="message">Message: </label>
                                            <input id="message" name="message" type="text" /> <br />
                                            <button className="btn-outline-primary">Send message</button>
                                        </Col>
                                    </Row>
                                </form>
                            </div>
                        </Container>

                    </ModalBody>

                </Modal>

            </footer>
        );
    }
}

function

stringifyFormData(fd) {
    const data = {};
    for (let key of fd.keys()) {
        data[key] = fd.get(key);
    }
    return JSON.stringify(data, null, 2);
}


export default Footer;
