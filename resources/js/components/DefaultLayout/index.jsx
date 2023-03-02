import React from 'react';
import Header from '../Header';
import NavControl from '../NavControl';
import { Container, Row, Col } from 'react-bootstrap';
import './style.scss';

function DefaultLayout({ children }) {
    return (
        <>
            <Container>
                <Row>
                    <Col className="header">
                        <Header />
                    </Col>
                </Row>
                <Row className="box-main-default">
                    <Col className="box-left" xl={2}>
                        <NavControl />
                    </Col>
                    <Col className="box-right" xl={9}>
                        {children}
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default DefaultLayout;
