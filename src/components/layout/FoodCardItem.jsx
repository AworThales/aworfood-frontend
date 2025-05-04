import React from 'react';
// import './FoodCardItem.css'; // optional for animations

const FoodCardItem = () => {
  return (
    <div
      className="card p-3 rounded shadow-sm border-0 fade-in-card"
      style={{ minWidth: '250px', maxWidth: '250px' }}
    >
      <img
        className="card-img-top mx-auto"
        src="/images/default_product.png"
        alt="Food"
      />

      <div className="card-body text-center d-flex flex-column">
        {/* Food Name */}
        <h5 className="card-title mb-2">
          <a href="#" className="text-decoration-none text-dark">
            Food Name
          </a>
        </h5>

        {/* Ratings */}
        <div className="ratings d-flex justify-content-center align-items-center mb-2">
          <div className="text-warning">
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
          </div>
          <span className="text-muted ms-2">(0)</span>
        </div>

        {/* Price */}
        <p className="card-text text-success fw-bold">$100</p>

        {/* Action Buttons */}
        <div className="mt-auto d-grid gap-2">
          <a href="#" className="btn btn-outline-secondary">
            View Details
          </a>
          <button className="btn btn-danger">
            <i className="fa fa-cart-plus me-2"></i>Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCardItem;
