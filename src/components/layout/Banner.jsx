import React from 'react';
import bannerImg from '/images/food_banner.png'; // Ensure this path is correct
import { Link } from 'react-router-dom';
// import './Banner.css'; // We'll create this CSS file

const Banner = () => {
  return (
    <section className="bg-light py-5">
      <div className="container">
        <div className="row align-items-center text-center text-lg-start g-5">
          
          {/* Text Content */}
          <div className="col-lg-6 fade-in-left">
            <h1 className="display-4 fw-bold text-dark">
              Fresh <span className="text-danger">Food</span> Delivered <br /> At Your <span className="text-success">Doorstep</span>
            </h1>
            <p className="lead text-muted mt-3">
              Explore the best meals in town and get them delivered hot and fast. Always fresh, always tasty.
            </p>
            <Link to="/cart" className="btn btn-danger btn-lg mt-4 px-4 py-2">
              Order Now
            </Link>
          </div>

          {/* Banner Image */}
          <div className="col-lg-6 fade-in-right">
            <img
              src={bannerImg}
              alt="Food Delivery Banner"
              className="img-fluid w-100"
              style={{ maxHeight: '100%', height: 'auto', }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
