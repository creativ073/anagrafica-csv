import React, { Component } from 'react';
import Layout from "../components/Layout";
import { Form, FormGroup, FormFeedback, Label, Input, Button, Row, Col, Container, Alert } from 'reactstrap';
import Head from "next/dist/next-server/lib/head";
import { login } from '../utils/auth';
import fetch from 'isomorphic-unfetch';

class Index extends Component {
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

    handleSubmit = async (e) => {
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
                },
                "isSubmitting": false
            }));
        } else {
            const url = '/api/login';
            const body = JSON.stringify({
                username: this.state.username,
                password: this.state.password
            });

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body
                });
                if (response.ok) {
                    const json = await response.json();

                    if (response.status === 201) {
                        await login({ token: json.token });
                    } else {
                        this.setState(state => ({
                            "errors": {
                                ...state.errors,
                                "login": json.message
                            }
                        }));
                    }
                } else {
                    console.log('Login failed.');
                    console.error(
                        'Login fallita',
                        error
                    );

                    this.setState(state => ({
                        "errors": {
                            ...state.errors,
                            "login": error
                        }
                    }));
                }
            } catch (error) {
                console.error(
                    'Errore chiamata login',
                    error
                );

                this.setState(state => ({
                    "errors": {
                        ...state.errors,
                        "login": "Errore tecnico, riprovare la login"
                    }
                }));
            }
            this.setState({
                "isSubmitting": false
            });
        }

        return false;
    };

    render() {
        const validUsername = !this.state.errors.username;
        const validPassword = !this.state.errors.password;

        return (
            <Layout private={ false }>
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
                            {
                                this.state.isDirty && this.state.errors.login &&

                                <Alert color="danger">
                                    { this.state.errors.login }
                                </Alert>
                            }
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