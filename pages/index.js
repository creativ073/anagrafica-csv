import React from 'react';
import Layout from "../components/Layout";
import { Form, FormGroup, Label, Input, Button, Row, Col, Container } from 'reactstrap';

const Index = () => (
    <Layout>
        <section>
            <h1>Anagrafica</h1>
            <p>Caricamento anagrafiche tramite file CSV.</p>
        </section>

        <section>
            <Form id="loginForm">
                <Container fluid={ true }>
                    <h2>Login</h2>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="exampleEmail">Email</Label>
                                <Input
                                    type="text"
                                    name="text"
                                    id="username"
                                    placeholder="Username"
                                />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="examplePassword">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-center"><Button color="primary">Accedi</Button></Col>
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
);

export default Index;