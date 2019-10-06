import React from 'react';
import { Container } from 'reactstrap';

const Layout = props => (
    <>
        <div id="main">
            <Container fluid={ true }>
                { props.children }
            </Container>
            <style jsx global>{ `
            body {
                background-color: #fff;
                background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3E%3Cg fill='%23dddddd' fill-opacity='0.4'%3E%3Cpath fill-rule='evenodd' d='M0 0h4v4H0V0zm4 4h4v4H4V4z'/%3E%3C/g%3E%3C/svg%3E");
            }
            #main{
                max-width: 900px;
                margin: 40px auto;
                padding: 20px;
                border: 2px solid #ccc;
                background-color: #fff;
            }
            section {
                margin-bottom: 40px;
            }
            ` }</style>
        </div>
    </>
);

export default Layout;