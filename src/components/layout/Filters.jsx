import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getPriceQueryParams } from '../../helpers/helpers';
import { FOOD_CATEGORIES } from '../../constants/constants';
import StarRatings from 'react-star-ratings';

const Filters = () => {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Handle single checkbox selection (for both category & ratings)
  const handleCheckBoxClick = (checkbox) => {
    const checkboxes = document.getElementsByName(checkbox.name);
    checkboxes.forEach((item) => {
      if (item !== checkbox) item.checked = false;
    });

    const newParams = new URLSearchParams(searchParams);

    if (!checkbox.checked) {
      newParams.delete(checkbox.name);
    } else {
      newParams.set(checkbox.name, checkbox.value);
    }

    const path = window.location.pathname + '?' + newParams.toString();
    navigate(path);
  };

  // Preserve selected filters on page reload
  const defaultCheckBoxHandler = (type, value) => {
    const param = searchParams.get(type);
    return param === value.toString();
  };

  // Set min and max on component mount
  useEffect(() => {
    if (searchParams.has('min')) setMin(searchParams.get('min'));
    if (searchParams.has('max')) setMax(searchParams.get('max'));
  }, [searchParams]);

  // Handle price form submit
  const handlePriceSubmit = (e) => {
    e.preventDefault();

    let updatedParams = getPriceQueryParams(searchParams, 'min', min);
    updatedParams = getPriceQueryParams(updatedParams, 'max', max);

    const path = window.location.pathname + '?' + updatedParams.toString();
    navigate(path);
  };

  return (
    <div className="border p-3 filter bg-white rounded">
      <h3>Filters</h3>
      <hr />

      {/* Price Filter */}
      <h5 className="mb-3">Price</h5>
      <form id="filter_form" className="px-2" onSubmit={handlePriceSubmit}>
        <div className="row g-2">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Min ($)"
              name="min"
              value={min}
              onChange={(e) => setMin(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Max ($)"
              name="max"
              value={max}
              onChange={(e) => setMax(e.target.value)}
            />
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-danger">GO</button>
          </div>
        </div>
      </form>

      <hr />

      {/* Category Filter */}
      <h5 className="mb-3">Category</h5>
      {FOOD_CATEGORIES.map((category, idx) => (
        <div className="form-check" key={`cat-${category}`}>
          <input
            className="form-check-input"
            type="checkbox"
            name="category"
            id={`category-${idx}`}
            value={category}
            defaultChecked={defaultCheckBoxHandler("category", category)}
            onClick={(e) => handleCheckBoxClick(e.target)}
          />
          <label className="form-check-label" htmlFor={`category-${idx}`}>
            {category}
          </label>
        </div>
      ))}

      <hr />

      {/* Ratings Filter */}
      <h5 className="mb-3">Ratings</h5>
      {[5, 4, 3, 2, 1].map((rating, idx) => (
        <div className="form-check" key={`rating-${rating}`}>
          <input
            className="form-check-input"
            type="checkbox"
            name="ratings"
            id={`rating-${idx}`}
            value={rating}
            defaultChecked={defaultCheckBoxHandler("ratings", rating)}
            onClick={(e) => handleCheckBoxClick(e.target)}
          />
          <label className="form-check-label" htmlFor={`rating-${idx}`}>
            <StarRatings
              rating={rating}
              starRatedColor="#ffb829"
              numberOfStars={5}
              name="rating"
              starDimension="18px"
              starSpacing="1px"
            />
          </label>
        </div>
      ))}
    </div>
  );
};

export default Filters;
