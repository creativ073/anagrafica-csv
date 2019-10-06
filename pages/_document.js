import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps }
    }

    render() {
        // noinspection HtmlRequiredTitleElement
        return (
            <Html>
                <Head>
                    <link key="bootstrap" rel="stylesheet" type="text/css" href="/static/bootstrap.min.css"/>
                </Head>
                <body>
                    <Main/>
                    <NextScript/>
                </body>
            </Html>
        )
    }
}

// noinspection JSUnusedGlobalSymbols
export default MyDocument;