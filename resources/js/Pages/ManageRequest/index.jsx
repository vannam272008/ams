import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Title from '../../components/ManageRequestComponents/Title';
import Display from '../../components/ManageRequestComponents/Display';
import AppPagination from '../../components/Pagination/AppPagination';
import request from '../../utils/request';
import { setDefaultDisplay, setRequestList } from '../../Actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading/Loading';

const ManageRequest = () => {
    const dispatch = useDispatch();
    const sortRequestAction = useSelector(
        (state) => state.user.sortRequestAction
    );
    const [currentPage, setCurrentPage] = useState(1);
    const meta = useSelector((state) => state.user.meta);
    const [successLoading, setSuccessLoading] = useState(false);

    useEffect(() => {
        dispatch(setDefaultDisplay());
    }, []);

    useEffect(() => {
        let search = '';
        let returned_date = '';
        const getRequestList = async () => {
            const token = JSON.parse(localStorage.getItem('token'));
            const headers = { headers: { Authorization: `Bearer ${token}` } };
            if (!sortRequestAction.search) {
                search = '';
            } else {
                search = '&search=' + sortRequestAction.search;
            }

            if (sortRequestAction.returnedDate === null) {
                returned_date = '';
            } else {
                returned_date =
                    '&returned_date=' + sortRequestAction.returnedDate;
            }

            const endpoint =
                '/request-for-returning?page=' +
                currentPage +
                '&sort=' +
                sortRequestAction.sortColumn +
                '&sorttype=' +
                sortRequestAction.sortType +
                search +
                '&state=' +
                sortRequestAction.filterType +
                returned_date;
            const response = await request.get(endpoint, headers);
            dispatch(
                setRequestList({
                    data: response.data.data,
                    meta: response.data.meta,
                    success: true,
                })
            );
            setSuccessLoading(true);
        };
        getRequestList();
    }, [sortRequestAction]);
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
                            pageNumber={
                                sortRequestAction && sortRequestAction.page
                            }
                            meta={meta}
                        />
                    </>
                )}
            </Row>
        </Container>
    );
};

export default ManageRequest;
