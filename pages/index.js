import React, { Component } from 'react';
import Layout from "../components/Layout";
import { Form, FormGroup, FormFeedback, Label, Input, Button, Row, Col, Container } from 'reactstrap';
import Head from "next/dist/next-server/lib/head";

class Index
    extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "username": "",
            "password": "",
            "errors": {
                "username": "",
                "password": "",
                "login": ""
            },
            "isSubmitting": false,
            "isDirty": false
        };
    }

    setInputValue = (e) => {
        const key = e.target.id;
        const val = e.target.value;

        this.setState(state => ({
            [key]: val,
            errors: {
                ...state.errors,
                [key]: !val ? "Campo richiesto" : ""
            }
        }));
    };

    handleSubmit = (e) => {
        e.preventDefault();

        let isValid = true;
        const errors = {
            "username": "",
            "password": "",
            "login": ""
        };

        this.setState({
            "isDirty": true,
            "isSubmitting": true,
            "errors": {
                ...errors
            }
        });

        if (!this.state.username) {
            errors.username = "Campo richiesto";
            isValid = false;
        }

        if (!this.state.password) {
            errors.password = "Campo richiesto";
            isValid = false;
        }
        if (!isValid) {
            this.setState(state => ({
                "errors": {
                    ...state.errors,
                    ...errors
                }
            }));
        }
        this.setState({
            "isSubmitting": false
        });
    };

    render() {
        const validUsername = !this.state.errors.username;
        const validPassword = !this.state.errors.password;

        return (
            <Layout>
                <Head>
                    <title>Anagrafica - Login</title>
                </Head>

                <section>
                    <h1>Anagrafica</h1>
                    <p>Caricamento anagrafiche tramite file CSV.</p>
                </section>

                <section>
                    <Form id="loginForm" onSubmit={ this.handleSubmit }>
                        <Container fluid={ true }>
                            <h2>Login</h2>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="username">Email</Label>
                                        <Input
                                            type="text"
                                            name="text"
                                            id="username"
                                            placeholder="Username"
                                            onChange={ this.setInputValue }
                                            value={ this.state.username }
                                            disabled={ this.state.isSubmitting }
                                            valid={ this.state.isDirty && validUsername }
                                            invalid={ this.state.isDirty && !validUsername }
                                        />
                                        {
                                            this.state.isDirty && !validUsername &&
                                            <FormFeedback>{ this.state.errors.username }</FormFeedback>
                                        }
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label for="password">Password</Label>
                                        <Input
                                            type="password"
                                            name="password"
                                            id="password"
                                            placeholder="Password"
                                            onChange={ this.setInputValue }
                                            value={ this.state.password }
                                            disabled={ this.state.isSubmitting }
                                            valid={ this.state.isDirty && validPassword }
                                            invalid={ this.state.isDirty && !validPassword }
                                        />
                                        {
                                            this.state.isDirty && !validPassword &&
                                            <FormFeedback>{ this.state.errors.password }</FormFeedback>
                                        }
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="text-center">
                                    <Button type='submit' color="primary"
                                            disabled={ this.state.isSubmitting }>Accedi</Button>
                                </Col>
                            </Row>
                        </Container>
                    </Form>
                </section>

                <style jsx global>{ `
            #loginForm {
                max-width: 600px;
                margin: 20px auto;
                padding: 20px;
                border: 1px solid #ccc;
                border-radius: 10px;
            }
        ` }</style>
            </Layout>
        )
    }
}

export default Index;