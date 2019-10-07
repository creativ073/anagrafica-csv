import React, { Component } from "react";
import { AppContext } from '../utils/context';
import Layout from "../components/Layout";
import Head from "next/dist/next-server/lib/head";
import { withAuthSync } from '../utils/auth';

class LoadPage extends Component {
    componentDidMount = async () => {
        if (!this.props.context.anagraficaInitialized) {
            try {
                await this.props.context.getAnagrafica();
            } catch (error) {
                console.error(error);
            }
        }
    };

    render() {
        const { getAnagraficaLoading, getAnagraficaError } = this.props.context;

        return (
            <Layout private={ true }>
                <Head>
                    <title>Anagrafica - Lista</title>
                </Head>

                <section>
                    <h1>Anagrafica</h1>
                </section>

                <section>
                    <h2>Lista persone</h2>
                    {
                        getAnagraficaError
                            ? <p className="error">{ getAnagraficaError }</p>
                            : (
                                getAnagraficaLoading
                                    ? <p>Caricamento lista...</p>
                                    : <ul>
                                        {
                                            this.props.context.anagrafica.map(persona => (
                                                <li key={ persona }>{persona}</li>
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
