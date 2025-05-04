import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { setCartItem } from '../../redux/features/cartSlice';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

const FoodItem = ({ food }) => {
  const [quantity, setQuantity] = useState(1)
      const dispatch = useDispatch()
  
      // defining cart item
      const setCartToItem = () => {
        const cartItem = {
          food: food?._id,
          name: food?.name,
          price: food?.price,
          image: food?.images[0]?.url,
          stock: food?.stock,
          quantity
        };
  
        dispatch(setCartItem(cartItem))
        toast.success("Item added to cart")
      };
  

  return (
    <>
      <div
        className="card p-3 container py-5 rounded shadow-sm border-0 fade-in-card"
        style={{
          minWidth: '250px',
          maxWidth: '250px',
          height: '100%', // Ensure the card height is consistent
        }}
      >
        {/* Image */}
        <div
          className="image-container border"
          style={{
            width: '100%',
            height: '200px', // Set a fixed height for the image container
            overflow: 'hidden', // Hide any excess part of the image that doesn't fit
          }}
        >
          <img
            className="card-img-top mx-auto"
            src={food?.images[0]?.url ? food?.images[0]?.url : '/images/default_product.png'}
            alt={food?.name}
            style={{
              objectFit: 'contain', // Ensures the entire image is visible without being cropped
              height: '100%', // Ensure the image covers the full height of its container
              width: '100%', // Ensure the image takes the full width of the container
            }}
          />
        </div>

        <div className="card-body d-flex flex-column">
          {/* Food Name */}
          <h5 className="card-title mb-2 text-truncate">
            <Link to={`/food/${food?._id}`} className="text-decoration-none text-dark">
              {food?.name}
            </Link>
          </h5>

          {/* Ratings */}
          <div className="border ratings d-flex justify-content-center align-items-center mb-2">
            <div className="text-warning">
              <StarRatings
                rating={food?.ratings}
                starRatedColor="#ffb829"
                numberOfStars={5}
                name="rating"
                starDimension="20px"
                starSpacing="1px"
              />
            </div>
            <span className="text-muted ms-2" style={{ fontSize: '1px' }}>
              {food?.numOfReviews}
            </span>
          </div>

          {/* Price */}
          <p className="card-text text-success fw-bold">${food?.price}</p>

          {/* Action Buttons */}
          <div className="mt-auto d-grid gap-2">
            <Link to={`/food/${food?._id}`} className="btn btn-outline-secondary">
              View Details
            </Link>
            <button className="btn btn-danger" disabled={food.stock <= 0} onClick={setCartToItem}>
              <i className="fa fa-cart-plus me-2"></i>Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodItem;
