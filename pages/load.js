import React, { PureComponent } from "react";
import Router from 'next/router';
import nextCookie from 'next-cookies';
import { FormGroup, FormFeedback, Label, CustomInput, Button, Row, Col, Container, Alert } from 'reactstrap';
import Layout from "../components/Layout";
import Head from "next/dist/next-server/lib/head";
import { login, withAuthSync } from '../utils/auth';
import fetch from 'isomorphic-unfetch';
import cookie from 'js-cookie';

class Load extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            "csv": "",
            "errors": {
                "csv": "",
                "login": ""
            },
            "isSubmitting": false,
            "isDirty": false
        };
    }

    static async getInitialProps(ctx) {
        const { token } = nextCookie(ctx);
        const apiUrl = 'http://localhost:3000/api/anagrafica';
        const ret = {
            csv: []
        };

        const redirectOnError = () =>
            typeof window !== 'undefined'
                ? Router.push('/index')
                : ctx.res.writeHead(302, { Location: 'http://localhost:3000/index' }).end();

        try {
            const response = await fetch(apiUrl, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    Authorization: "Bearer " + token
                }
            });

            if (response.ok) {
                console.info("load CSV OK");
                return await response.json();
            } else {
                console.error("load CSV KO");
                await redirectOnError();
            }
        } catch (error) {
            console.error("load CSV error", error);
            await redirectOnError();
        }
        console.info("load CSV return");
        return ret;
    };

    setInputValue = (e) => {
        const val = e.target.files[0];

        this.setState(state => ({
            "csv": val,
            errors: {
                ...state.errors,
                "csv": !val ? "Campo richiesto" : ""
            }
        }));
    };

    handleSubmit = async (e) => {
        e.preventDefault();

        let isValid = true;
        const errors = {
            "csv": "",
            "login": ""
        };

        this.setState({
            "isDirty": true,
            "isSubmitting": true,
            "errors": {
                ...errors
            }
        });

        if (!this.state.csv) {
            errors.csv = "Campo richiesto";
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
            const token = cookie.get('token');
            const url = '/api/anagrafica';
            let body = new FormData();
            body.append('csv', this.state.csv);

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        Authorization: "Bearer " + token
                    },
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
        const validCsv = !this.state.errors.csv;

        return (
            <Layout private={ true }>
                <Head>
                    <title>Anagrafica - Lista</title>
                </Head>

                <section>
                    <h1>Caricamento file CSV</h1>
                </section>

                <section>
                    <h2>Nuovo file da caricare</h2>

                    <div id="loadForm">
                        {
                            this.state.isDirty && this.state.errors.login &&

                            <Alert color="danger">
                                { this.state.errors.login }
                            </Alert>
                        }
                        <Container fluid={ true }>
                            <Row>
                                <Col xs={ 12 } md={ 9 }>
                                    <FormGroup>
                                        <Label for="username">Email</Label>
                                        <CustomInput
                                            type="file"
                                            name="csv"
                                            id="csv"
                                            placeholder="File CSV"
                                            onChange={ this.setInputValue }
                                            disabled={ this.state.isSubmitting }
                                            valid={ this.state.isDirty && validCsv }
                                            invalid={ this.state.isDirty && !validCsv }
                                        />
                                        {
                                            this.state.isDirty && !validCsv &&
                                            <FormFeedback>{ this.state.errors.csv }</FormFeedback>
                                        }
                                    </FormGroup>
                                </Col>
                                <Col xs={ 12 } md={ 3 } className="text-left pt-4">
                                    <div className="pt-2">
                                        <Button type='button' color="primary" onClick={ this.handleSubmit }
                                                disabled={ this.state.isSubmitting }>Invia</Button>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </section>

                <section>
                    <h2>File caricati</h2>
                    <ul>
                        {
                            this.props.csv.map(file => <li key={ file.id }>Caricato il { file.date }</li>)
                        }
                    </ul>
                </section>
            </Layout>
        );
    }

}

export default withAuthSync(Load);
