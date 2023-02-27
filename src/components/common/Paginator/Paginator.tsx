
import React from 'react';
import cl from './Paginator.module.css';
import { useState } from 'react';
import { useEffect } from 'react';

type PropsType = {
    totalItems: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    portionSize?: number
}

let Paginator: React.FC<PropsType> = ({
    totalItems,
    pageSize,
    currentPage,
    onPageChanged,
    portionSize = 10,
}) => {

    let pagesCount = Math.ceil(totalItems / pageSize);
    let pages: Array<number> = [];
    if (pagesCount > 100) {
        pagesCount = 100;
    }
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    useEffect(
        () => setPageNumber(Math.ceil(currentPage / portionSize)),
        [currentPage]
    );

    const [pageNumber, setPageNumber] = useState(1);

    let rightMaxBorder = pageNumber * portionSize;
    let leftMinBorder = (pageNumber - 1) * portionSize + 1;
    let showingRangeOfPages = Math.ceil(pagesCount / portionSize);
    return (
        <div>
            <h3>You are on {currentPage} page !</h3>
            {pageNumber > 1 ? (
                <button
                    onClick={() => {
                        setPageNumber(pageNumber - 1);
                    }}
                >
                    Prev. Page
                </button>
            ) : null}
            {pages
                .filter((p) => p >= leftMinBorder && p <= rightMaxBorder)
                .map((p) => {
                    return (
                        <span
                            key={p}
                            onClick={(e) => {
                                onPageChanged(p);
                            }}
                            className={
                                currentPage === p ? cl.selectedPage : cl.page
                            }
                        >
                            {p}
                        </span>
                    );
                })}
            {showingRangeOfPages > pageNumber ? (
                <button
                    onClick={() => {
                        setPageNumber(pageNumber + 1);
                    }}
                >
                    Next Page
                </button>
            ) : null}
        </div>
    );
};

export default Paginator;
