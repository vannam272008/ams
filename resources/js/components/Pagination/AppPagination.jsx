import React, { memo, useEffect } from 'react';
import './AppPagination.scss';
import { Pagination } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { changePage, setDefaultFirstRecord } from '../../Actions/userActions';

const AppPagination = (props) => {
    const dispatch = useDispatch();
    const { currentPage, setCurrentPage, pageNumber, meta } = props;

    useEffect(() => {
        dispatch(changePage(currentPage));
        return () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        };
    }, [currentPage]);

    const handleChangePage = (newPage) => {
        if (currentPage !== newPage) {
            setCurrentPage(newPage);
            dispatch(changePage(newPage));
            dispatch(setDefaultFirstRecord());
        }
    };

    const listPage = [];
    for (let i = 1; i <= meta.last_page; i++) {
        listPage.push(i);
    }
    const slides = listPage.map((page, index) => {
        return (
            <Pagination.Item
                key={index}
                onClick={() => handleChangePage(page)}
                className={parseInt(page) === pageNumber && 'page-current'}
                disabled={page === '...'}
            >
                {page}
            </Pagination.Item>
        );
    });

    return (
        <div className="app-pagination">
            <Pagination>
                <Pagination.Item
                    onClick={() => handleChangePage(currentPage - 1)}
                    disabled={pageNumber <= 1 && 'disabled'}
                >
                    Previous
                </Pagination.Item>
                {slides}
                <Pagination.Item
                    onClick={() => handleChangePage(currentPage + 1)}
                    disabled={pageNumber >= meta.last_page && 'disabled'}
                >
                    Next
                </Pagination.Item>
            </Pagination>
        </div>
    );
};

export default memo(AppPagination);
