import React from 'react';
import _ from "lodash"

const Pagination = ({pageSize, content, currentPage, setPage}) => {

    const pageCount = Math.ceil(content?.length / pageSize)
    const pages = _.range(1, pageCount + 1)

    const handleChangePage = (number) => {
        setPage(number)
    }

    const handleArrowClick = (num) => {
        if (currentPage + num > 0 && currentPage + num <= pageCount) {
            setPage(prevState => prevState + num)
        }
    }

    if (content?.length <= pageSize) {
        return null
    }

    return (
        <nav className=" mt-3" aria-label="Page navigation example">
            <ul className="pagination">
                <li className="page-item">
                    <a onClick={() => handleArrowClick(-1)} className="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                {
                    pages.map(page =>
                        <li className={"page-item " + (page === currentPage ? " active" : "")}>
                            <a
                                onClick={() => handleChangePage(page)}
                               className="page-link"
                            >
                                {page}
                            </a>
                        </li>
                    )
                }
                <li className="page-item">
                    <a onClick={() => handleArrowClick(1)} className="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
