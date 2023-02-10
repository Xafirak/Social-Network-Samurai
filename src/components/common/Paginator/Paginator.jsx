// @ts-nocheck
import React from 'react';
import cl from './Paginator.module.css';

let Paginator = ({ totalUsers, pageSize, currentPage, onPageChanged }) => {
    let pagesCount = Math.ceil(totalUsers / pageSize);
    let pages = [];
    if (pagesCount > 35) {
        pagesCount = 35;
    }
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div>
            {pages.map((p) => {
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
        </div>
    );
};

export default Paginator;
