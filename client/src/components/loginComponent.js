import React, { Component } from 'react';
import {
    Container, Col, Form,
        FormGroup, Label, Input,
        Button,
} from 'reactstrap';

class Login extends Component {
    render() {
        return (
            <Container className="App">
                <h2>Sign In</h2>
                <Form className="form">
                    <Col>
                        <FormGroup>
                            <Input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Enter your username"
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Enter your password"
                            />
                        </FormGroup>
                    </Col>
                    <Button>Submit</Button>
                </Form>
            </Container>
        );
    }
}

module.exports = Login;