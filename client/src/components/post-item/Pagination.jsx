import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import useIsSticky from '../../hooks/useIsSticky';

const Pagination = ({ currentPage, setCurrentPage, dataPost, postsPerPage }) => {
    const { isSticky, stickyDom } = useIsSticky()
    const changePage = (newPage) => {
        if (newPage > 0 && newPage <= pageNumbers.length) setCurrentPage(newPage)
    };
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(dataPost.length / postsPerPage); i++) { pageNumbers.push(i) }

    const renderPageButton = (number) => (
        <button
            key={number} onClick={() => changePage(number)}
            className='w-6 h-6 flex justify-center items-center rounded-full text-white transition-all'
            style={{
                backgroundColor: number === currentPage ? '#2693f6' : 'white',
                color: number === currentPage ? 'white' : 'gray',
            }}>{number}</button>
    );
    return (
        <>
            <div className={`bg-white ${isSticky ?
                'sticky -top-[1px] rounded-t-none shadow-lg rounded-lg' : ''}`}>
                <div ref={stickyDom} className={` select-none max-w-[400px] m-auto p-3 flex gap-5 justify-end
                            items-center text-gray-500 mb-5 `}>
                    {pageNumbers.length > 0 &&
                        <ButtonPagination className={' mr-auto'}
                            disabled={currentPage === 1}
                            onClick={() => changePage(currentPage - 1)}>
                            <FontAwesomeIcon icon={faAnglesLeft} />
                        </ButtonPagination>}
                    {pageNumbers.length < 8 ? (
                        pageNumbers.map(renderPageButton)
                    ) : (
                        <>
                            {pageNumbers.slice(0, 2).map(renderPageButton)}
                            <span>...</span>
                            {currentPage > 2 && currentPage < pageNumbers.length - 1
                                ? renderPageButton(currentPage)
                                : renderPageButton(Math.ceil(pageNumbers.length / 2))}
                            <span>...</span>
                            {pageNumbers.slice(-2).map(renderPageButton)}
                        </>
                    )}
                    {pageNumbers.length > 0 &&
                        <ButtonPagination className={' ml-auto'}
                            disabled={currentPage === pageNumbers.length}
                            onClick={() => changePage(currentPage + 1)}>
                            <FontAwesomeIcon icon={faAnglesRight} />
                        </ButtonPagination>}
                </div>
            </div>
        </>
    )
};

const ButtonPagination = ({ onClick = () => { }, disabled, className, children }) => {
    return (
        <button
            className={`${className} transition-all disabled:invisible disabled:opacity-0`}
            onClick={() => onClick()}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default Pagination;
