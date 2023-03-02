import React, { useLayoutEffect, useState } from 'react';
import { NavItem, Container, Row, Col } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { NavLink } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import { AiFillHome } from 'react-icons/ai';
// import { FaUserCog } from 'react-icons/fa';
// import { MdAssignment, MdReport, MdRequestPage } from 'react-icons/md';

import './style.scss';

function NavControl() {
    const [listItem, setListItem] = useState([]);

    const admin = JSON.parse(localStorage.getItem('admin'));

    useLayoutEffect(() => {
        if (admin) {
            setListItem([
                {
                    link: '/home',
                    title: 'Home',
                },
                {
                    link: '/manage-user',
                    title: 'Manage User',
                },
                {
                    link: '/manage-asset',
                    title: 'Manage Asset',
                },
                {
                    link: '/manage-assignment',
                    title: 'Manage Assignment',
                },
                {
                    link: '/manage-request',
                    title: 'Request for Returning',
                },
                {
                    link: '/report',
                    title: 'Report',
                },
            ]);
        }
        if (!admin) {
            setListItem([
                {
                    link: '/home',
                    title: 'Home',
                },
            ]);
        }
    }, [admin]);

    const slides = listItem.map((item) => {
        return (
            <ListGroup.Item key={item.title}>
                <NavItem>
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? 'active item' : 'inactive item'
                        }
                        to={item.link}
                    >
                        <AiFillHome className="icon-nav" />
                        <span>{item.title}</span>
                    </NavLink>
                </NavItem>
            </ListGroup.Item>
        );
    });

    return (
        <Container className="container-nav">
            <Row className="logo">
                <Col>
                    <img src={logo} alt="logo" />
                    <br />
                    <span>Online Asset Management</span>
                </Col>
            </Row>
            <Row className="controller-nav">
                <Col>
                    <ListGroup>{slides}</ListGroup>
                </Col>
            </Row>
        </Container>
    );
}

export default NavControl;
