import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import Display from '../../components/ManageUserComponents/Display/Display';
import Title from '../../components/ManageUserComponents/Title/Title';
import AppPagination from '../../components/Pagination/AppPagination';
import request from '../../utils/request';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, setDefaultDisplay } from '../../Actions/userActions';
import Loading from '../../components/Loading/Loading';

function ManagerUser() {
    const dispatch = useDispatch();
    const sortAction = useSelector((state) => state.user.sortAction);
    const meta = useSelector((state) => state.user.meta);
    const [currentPage, setCurrentPage] = useState(1);
    const [successLoading, setSuccessLoading] = useState(false);
    useEffect(() => {
        dispatch(setDefaultDisplay('user'));
    }, []);

    useEffect(() => {
        const getUserList = async () => {
            const token = JSON.parse(localStorage.getItem('token'));
            const headers = { headers: { Authorization: `Bearer ${token}` } };
            let search;
            if (sortAction.sortColumn === '')
                sortAction.sortColumn = 'full_name';
            if (sortAction.search == null) search = '';
            else search = '&search=' + sortAction.search;
            let order = sortAction.sortType;
            if (sortAction.sortColumn === 'admin') {
                if (order === 2) {
                    order = 1;
                } else {
                    order = 2;
                }
            }
            const endpoint =
                '/user?page=' +
                currentPage +
                '&sort=' +
                sortAction.sortColumn +
                '&sorttype=' +
                order +
                search +
                '&type=' +
                sortAction.filterType;

            const response = await request.get(endpoint, headers);
            dispatch(
                getAllUsers({
                    data: response.data.data,
                    meta: response.data.meta,
                    success: true,
                })
            );
            setSuccessLoading(true);
        };
        getUserList();
    }, [sortAction]);

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
                            pageNumber={sortAction && sortAction.page}
                            meta={meta}
                        />
                    </>
                )}
            </Row>
        </Container>
    );
}

export default ManagerUser;
