import React, { useState } from "react";
import ReactPaginate from 'react-paginate';
import "./pagination.css";

export default function Pagination(props) {
    let { paging, setFilters, filters } = props;
    let total = (Math.ceil(paging.total / filters.pageSize));
    console.log(total);
    function changePage(event) {
        const currentPage = event.selected + 1;
        setFilters(
            {
                ...filters, current: currentPage
            })
    }
    return (
        <ReactPaginate
            previousLabel={'Trước'}
            nextLabel={'Kế tiếp'}
            pageCount={total}
            disabledClassName="disabled-btn"
            marginPagesDisplayed={0}
            pageRangeDisplayed={2}
            containerClassName="pagination"
            pageLinkClassName="numberPage"
            onPageChange={(e) => changePage(e)}
            forcePage={paging.current - 1}
        />
    )
}