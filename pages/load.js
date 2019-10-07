import React, { Component } from "react";
import { AppContext } from '../utils/context';
import { FormGroup, FormFeedback, Label, CustomInput, Button, Row, Col, Container, Alert } from 'reactstrap';
import Layout from "../components/Layout";
import Head from "next/dist/next-server/lib/head";
import { withAuthSync } from '../utils/auth';

class LoadPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "csv": "",
            "errors": {
                "csv": "",
                "login": ""
            },
            "isDirty": false
        };
    }

    componentDidMount = async () => {
        if (!this.props.context.csvInitialized) {
            try {
                await this.props.context.getCsvList();
            } catch (error) {
                console.error(error);
            }
        }
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
            "csv": ""
        };

        this.setState(state => ({
            "isDirty": true,
            "errors": {
                ...state.errors,
                ...errors
            }
        }));

        if (!this.state.csv) {
            errors.csv = "Campo richiesto";
            isValid = false;
        }

        if (!isValid) {
            this.setState(state => ({
                "errors": {
                    ...state.errors,
                    ...errors
                }
            }));
        } else {
            try {
                await this.props.context.sendCsv(this.state.csv);

                this.setState({
                    "csv": ""
                });
            } catch (error) {
                console.error(error);
            }
        }

        return false;
    };

    render() {
        const validCsv = !this.state.errors.csv;
        const { isDirty } = this.state;
        const { sendCsvLoading, sendCsvError, getCsvListLoading, getCsvListError } = this.props.context;

        return (
            <Layout private={ true }>
                <Head>
                    <title>CSV - Lista</title>
                </Head>

                <section>
                    <h1>Caricamento file CSV</h1>
                </section>

                <section>
                    <h2>Nuovo file da caricare</h2>

                    <div id="loadForm">
                        {
                            isDirty && sendCsvError &&

                            <Alert color="danger">
                                { sendCsvError }
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
                                            disabled={ sendCsvLoading }
                                            valid={ isDirty && validCsv }
                                            invalid={ isDirty && !validCsv }
                                        />
                                        {
                                            isDirty && !validCsv &&
                                            <FormFeedback>{ this.state.errors.csv }</FormFeedback>
                                        }
                                    </FormGroup>
                                </Col>
                                <Col xs={ 12 } md={ 3 } className="text-left pt-4">
                                    <div className="pt-2">
                                        {
                                            sendCsvLoading
                                                ? <p>Loading</p>
                                                : <Button type='button' color="primary"
                                                          onClick={ this.handleSubmit }>Invia</Button>
                                        }
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </section>

                <section>
                    <h2>File caricati</h2>
                    {
                        getCsvListError
                            ? <p className="error">{ getCsvListError }</p>
                            : (
                                getCsvListLoading
                                    ? <p>Caricamento lista...</p>
                                    : <ul>
                                        {
                                            this.props.context.csv.map(file => (
                                                <li key={ file.id }>
                                                    <a href={ "/api/csv/" + file.id } target="_blank">
                                                        Caricato
                                                        il { file.date }</a></li>
                                            ))
                                        }
                                    </ul>
                            )
                    }
                </section>
            </Layout>
        );
    }
}

function Load(props) {
    return (<AppContext.Consumer>
        { (context) => <LoadPage { ...props } context={ context }/> }
    </AppContext.Consumer>);
}

export default withAuthSync(Load);
