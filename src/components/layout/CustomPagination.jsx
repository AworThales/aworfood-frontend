import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Pagination from "react-js-pagination";


const CustomPagination = ({resPerPage, filteredFoodsCount}) => {
    const [currentPage, setCurrentPage] = useState();
    const navigate = useNavigate();

    let [searchParams] = useSearchParams()

    const page = Number(searchParams.get('page')) || 1;

    useEffect(()=>{
        setCurrentPage(page)
    }, [page]);

    // responsible to change page number
    const setCurrentPageNo = (pageNumber) =>{
        setCurrentPage(pageNumber);
        if(searchParams.has('page')){
            // if page already exist
            searchParams.set('page', pageNumber);
        } else {
            // if page not exist
            searchParams.append('page', pageNumber);
        }
        const path = window.location.pathname + "?" + searchParams.toString()
        navigate(path);
    };

  return (
    <>
    <div className="d-flex justify-content-center mt-4">
        <Pagination
            activePage={currentPage}
            itemsCountPerPage={resPerPage}
            totalItemsCount={filteredFoodsCount}
            onChange={setCurrentPageNo}
            nextPageText={'Next'}
            prevPageText={'Prev'}
            firstPageText={'First'}
            lastPageText={'Last'}
            itemClass="page-item"
            linkClass="page-link"
        />
</div>
     
    </>
  )
}

export default CustomPagination