import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Title from '../../components/ManageAssignmentComponents/Title';
import Display from '../../components/ManageAssignmentComponents/Display';
import AppPagination from '../../components/Pagination/AppPagination';
import request from '../../utils/request';
import {
    setAssignmentList,
    setDefaultDisplay,
} from '../../Actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading/Loading';

const ManageAssignment = () => {
    const dispatch = useDispatch();
    const sortAssignment = useSelector((state) => state.user.sortAssignment);
    const [currentPage, setCurrentPage] = useState(1);
    const meta = useSelector((state) => state.user.meta);
    const [successLoading, setSuccessLoading] = useState(false);

    useEffect(() => {
        dispatch(setDefaultDisplay('assignment'));
    }, []);

    useEffect(() => {
        let search = '';
        let assigned_date = '';
        const getAssignmentList = async () => {
            const token = JSON.parse(localStorage.getItem('token'));
            const headers = { headers: { Authorization: `Bearer ${token}` } };
            if (!sortAssignment.search) {
                search = '';
            } else {
                search = '&search=' + sortAssignment.search;
            }

            if (
                sortAssignment.assignedDate === null ||
                sortAssignment.assignedDate === 'Invalid date'
            ) {
                assigned_date = '';
            } else {
                assigned_date = '&assigned_date=' + sortAssignment.assignedDate;
            }

            const endpoint =
                '/assignment?page=' +
                currentPage +
                '&sort=' +
                sortAssignment.sortColumn +
                '&sorttype=' +
                sortAssignment.sortType +
                search +
                '&state=' +
                sortAssignment.filterType +
                assigned_date;
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
    }, [sortAssignment]);

    return (
        <Container>
            <Row>
                <Title
                    setCurrentPage={setCurrentPage}
                    setSuccessLoading={setSuccessLoading}
                />
                {!successLoading && <Loading />}
                {successLoading && (
                    <>
                        <Col>
                            <Display
                                currentPage={currentPage}
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
        </Container>
    );
};

export default ManageAssignment;
