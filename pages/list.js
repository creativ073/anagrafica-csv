import React from "react";
import Layout from "../components/Layout";
import Head from "next/dist/next-server/lib/head";
import { withAuthSync } from '../utils/auth';

function List() {
    return (
        <Layout private={ true }>
            <Head>
                <title>Anagrafica - Lista</title>
            </Head>
        </Layout>
    );
}

export default withAuthSync(List);
