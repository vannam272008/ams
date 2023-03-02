import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Display from '../../components/HomeComponents/Display';
import AppPagination from '../../components/Pagination/AppPagination';
import request from '../../utils/request';
import {
    setAssignmentList,
    setDefaultDisplay,
} from '../../Actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading/Loading';
import PasswordFirstChange from '../../components/PasswordFirstChange';

const Home = () => {
    const first_login = JSON.parse(localStorage.getItem('first_login'));
    const dispatch = useDispatch();
    const sortAssignment = useSelector((state) => state.user.sortAssignment);
    const [currentPage, setCurrentPage] = useState(1);
    const meta = useSelector((state) => state.user.meta);
    const [successLoading, setSuccessLoading] = useState(false);

    useEffect(() => {
        dispatch(setDefaultDisplay('home'));
    }, []);

    useEffect(() => {
        const getAssignmentList = async () => {
            const token = JSON.parse(localStorage.getItem('token'));
            const headers = { headers: { Authorization: `Bearer ${token}` } };
            const endpoint =
                '/assignment/user?page=' +
                currentPage +
                '&sort=' +
                sortAssignment.sortColumn +
                '&sorttype=' +
                sortAssignment.sortType;
            // search +
            // '&state=' +
            // sortAssignment.filterType +
            // assigned_date;
            const response = await request.get(endpoint, headers);
            dispatch(
                setAssignmentList({
                    data: response.data.data,
                    meta: response.data.meta,
                    success: true,
                })
            );
            setSuccessLoading(true);
        };
        getAssignmentList();
        console.log(3);
    }, [sortAssignment]);
    return (
        <Container>
            <div className="title-manage-assignment">
                <h5>
                    <b>My Assignment</b>
                </h5>
            </div>
            <Row>
                {!successLoading && <Loading />}
                {successLoading && (
                    <>
                        <Col>
                            <Display
                                setCurrentPage={setCurrentPage}
                                setSuccessLoading={setSuccessLoading}
                            />
                        </Col>
                        <AppPagination
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            pageNumber={sortAssignment && sortAssignment.page}
                            meta={meta}
                        />
                    </>
                )}
            </Row>
            <PasswordFirstChange showModal={first_login} />
        </Container>
    );
};

export default Home;
