import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import Display from '../../components/ManageAssetComponents/Display/Display';
import Title from '../../components/ManageAssetComponents/Title/Title';
import AppPagination from '../../components/Pagination/AppPagination';
import request from '../../utils/request';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAssets, setDefaultDisplay } from '../../Actions/userActions';
import Loading from '../../components/Loading/Loading';

function ManagerAsset() {
    const dispatch = useDispatch();
    const sortAssetAction = useSelector((state) => state.user.sortAssetAction);
    const [currentPage, setCurrentPage] = useState(1);
    const meta = useSelector((state) => state.user.meta);
    const [successLoading, setSuccessLoading] = useState(false);

    useEffect(() => {
        dispatch(setDefaultDisplay('asset'));
    }, []);

    useEffect(() => {
        const getAssetList = async () => {
            const token = JSON.parse(localStorage.getItem('token'));
            const headers = { headers: { Authorization: `Bearer ${token}` } };
            let search;

            if (sortAssetAction.search == null) search = '';
            else search = '&search=' + sortAssetAction.search;
            const endpoint =
                '/asset?page=' +
                currentPage +
                '&sort=' +
                sortAssetAction.sortColumn +
                '&sorttype=' +
                sortAssetAction.sortType +
                search +
                '&category_id=' +
                sortAssetAction.filterCategory +
                '&status_id=' +
                sortAssetAction.filterState;
            const response = await request.get(endpoint, headers);
            dispatch(
                getAllAssets({
                    data: response.data.data,
                    meta: response.data.meta,
                    success: true,
                })
            );
            setSuccessLoading(true);
        };
        getAssetList();
    }, [sortAssetAction]);

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
                            pageNumber={sortAssetAction && sortAssetAction.page}
                            meta={meta}
                        />
                    </>
                )}
            </Row>
        </Container>
    );
}

export default ManagerAsset;
