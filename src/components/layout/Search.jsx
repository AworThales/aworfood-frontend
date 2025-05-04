import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();

        if(keyword.trim()) {
            navigate(`/?keyword=${keyword}`);
        } else{
            navigate(`/`);
        }
    }

  return (
    <>
        <form
            onSubmit={submitHandler}
            action="your_search_action_url_here"
            method="get"
            className="d-flex w-50 w-md-50 w-lg-40"
            // d-flex w-100 w-md-75 w-lg-50
            // d-flex w-100 w-md-50 w-lg-50
        >
            <input
            className="form-control rounded-start"
            type="search"
            placeholder="Search for meals, groceries..."
            name="keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            />
            <button className="btn btn-danger rounded-end px-3" type="submit">
            <i className="fa fa-search"></i>
            </button>
        </form>
    </>
  )
}

export default Search