import React from 'react';
import './pagination.scss';
import classNames from 'classnames/bind';

function Pagination(props) {
    let { PageSize, PageNumber, NumberOfRecords, onClick } = props,
        arrayLength = Math.ceil(NumberOfRecords / PageSize),
        pageArray = [],
        rowEndCount = PageNumber * PageSize;

    while (Boolean(arrayLength)) {
        pageArray.push(arrayLength);
        arrayLength--
    }
    let pageArrayRev = JSON.parse(JSON.stringify(pageArray));
    pageArray = pageArray.reverse();

    return (
        Boolean(NumberOfRecords) &&
        <React.Fragment>
            <div className="pagination-details">
                <p>Menampilkan {((PageNumber - 1) * PageSize) + 1} sampai {(rowEndCount > NumberOfRecords) ? NumberOfRecords : rowEndCount} dari {NumberOfRecords} data</p>
            </div>
            <div className="pagination-wrap">
                <nav>
                    <ul className="pagination flex-wrap">
                        <li className={classNames("page-item ml-auto", { "disabled": (PageNumber === 1) })} onClick={() => ((PageNumber === 1) ? null : onClick(1))}>
                            <span className="page-link"><i className="fas fa-angle-double-left"></i></span>
                        </li>
                        <li className={classNames("page-item", { "disabled": (PageNumber === 1) })} onClick={() => ((PageNumber === 1) ? null : onClick(PageNumber - 1))}>
                            <span className="page-link"><i className="fas fa-angle-left"></i></span>
                        </li>
                        {
                            (PageNumber !== pageArray[0] && PageNumber !== pageArray[1] && PageNumber !== pageArray[2]) &&
                            <li className="page-item disabled" >
                                <span className="page-link border-0"><i className="fas fa-ellipsis-h"></i></span>
                            </li>
                        }
                        {
                            pageArray.filter(x => ((PageNumber - 3) < x && x < (PageNumber + 3))).map(x =>
                                <li key={x} className={classNames("page-item", { "active": (PageNumber === x) })} onClick={() => ((PageNumber === x) ? null : onClick(x))}>
                                    <span className="page-link">{x}</span>
                                </li>
                            )
                        }
                        {
                            (PageNumber !== pageArrayRev[0] && PageNumber !== pageArrayRev[1] && PageNumber !== pageArrayRev[2]) &&
                            <li className="page-item disabled" >
                                <span className="page-link border-0"><i className="fas fa-ellipsis-h"></i></span>
                            </li>
                        }
                        <li className={classNames("page-item", { "disabled": (PageNumber === pageArrayRev[0]) })} onClick={() => ((PageNumber === pageArrayRev[0]) ? null : onClick(PageNumber + 1))}>
                            <span className="page-link"><i className="fas fa-angle-right"></i></span>
                        </li>
                        <li className={classNames("page-item", { "disabled": (PageNumber === pageArrayRev[0]) })} onClick={() => ((PageNumber === pageArrayRev[0]) ? null : onClick(pageArrayRev[0]))}>
                            <span className="page-link"><i className="fas fa-angle-double-right"></i></span>
                        </li>
                    </ul>
                </nav>
            </div>
        </React.Fragment>
    );
}

export default Pagination;