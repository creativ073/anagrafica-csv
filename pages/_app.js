import React from 'react';
import App from 'next/app';
//import Router from "next/router";
import fetch from "isomorphic-unfetch";
import cookie from 'js-cookie';
import { AppContext } from '../utils/context';

class MyApp extends App {
    constructor(props) {
        super(props);
        this.state = {
            "csv": [],
            "csvInitialized": false,
            "getCsvListLoading": false,
            "getCsvListError": "",
            "sendCsvLoading": false,
            "sendCsvError": ""
        };
    }

    getCsvList = async () => {
        const token = cookie.get('token');
        const apiUrl = 'http://localhost:3000/api/csv';

        //const redirectOnError = () => Router.push('/index');

        this.setState({
            "csvInitialized": true,
            "getCsvListLoading": true,
            "getCsvListError": ""
        });

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
                const json = await response.json();

                this.setState({
                    csv: json.csv.reverse(),
                    "getCsvListLoading": false,
                    "getCsvListError": ""
                })
            } else {
                console.error("load CSV KO");
                this.setState({
                    "getCsvListLoading": false,
                    "getCsvListError": "Errore caricamento dati"
                });
            }
        } catch (error) {
            this.setState({
                "getCsvListLoading": false,
                "getCsvListError": "Errore caricamento dati"
            });
        }
        console.info("load CSV return");
    };

    sendCsv = async (csv) => {
        const token = cookie.get('token');
        const url = '/api/csv';
        let body = new FormData();
        body.append('csv', csv);

        this.setState({
            "sendCsvLoading": true,
            "sendCsvError": ""
        });

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
                    this.setState({
                        "sendCsvLoading": false,
                        "sendCsvError": ""
                    });
                    this.getCsvList();
                } else {
                    this.setState({
                        "sendCsvLoading": false,
                        "sendCsvError": json.message
                    });
                }
            } else {
                console.log('Login failed.');
                console.error(
                    'Login fallita',
                    error
                );
                this.setState({
                    "sendCsvLoading": false,
                    "sendCsvError": error.message
                });
            }
        } catch (error) {
            console.error(
                'Errore chiamata login',
                error
            );
            this.setState({
                "sendCsvLoading": false,
                "sendCsvError": "Errore tecnico, riprovare più tardi"
            });
        }
    };

    render() {
        const { Component, pageProps } = this.props;
        return (
            <AppContext.Provider value={ {
                ...this.state,
                getCsvList: this.getCsvList,
                sendCsv: this.sendCsv
            } }>
                <Component { ...pageProps } />
            </AppContext.Provider>
        );
    }
}

// noinspection JSUnusedGlobalSymbols
export default MyApp