import React, { useEffect, useState } from 'react';
import { useGetFoodDetailsQuery } from '../../redux/api/foodApi';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import LoadingSpinner from '../layout/LoadingSpinner';
import StarRatings from 'react-star-ratings';
import { useDispatch, useSelector } from 'react-redux';
import { setCartItem } from '../../redux/features/cartSlice';
import MetaData from '../layout/MetaData';
import NewReview from '../reviews/NewReview';
import ListReviews from '../reviews/ListReviews';
import NotFound from '../layout/NotFound';

const FoodDetails = () => {
  const [activeImg, setActiveImg] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const params = useParams();
  const { data, isLoading, error, isError } = useGetFoodDetailsQuery(params?.id);
  const food = data?.food;

  const { isAuthenticated } = useSelector((state) => state.auth);

  // Set main image when food changes
  useEffect(() => {
    if (food?.images?.length > 0) {
      setActiveImg(food.images[0].url);
    } else {
      setActiveImg('/images/default_product.png');
    }
  }, [food]);

  // Handle error toast
  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError, error?.data?.message]);

  const increaseQty = () => {
    const count = document.querySelector('.count');
    if (count.valueAsNumber >= food?.stock) return;
    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  };

  const decreaseQty = () => {
    const count = document.querySelector('.count');
    if (count.valueAsNumber <= 1) return;
    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
  };

  const setCartToItem = () => {
    const cartItem = {
      food: food?._id,
      name: food?.name,
      price: food?.price,
      image: food?.images[0]?.url,
      stock: food?.stock,
      quantity,
    };

    dispatch(setCartItem(cartItem));
    toast.success('Item added to cart');
  };


  if (isLoading) return <LoadingSpinner />;

  if(error && error?.status == 404) {
    return <NotFound />
  }

  return (
    <>
      <MetaData title={food?.name || 'Food Details'} />

      <div className="container py-5">
        <div className="row g-5">
          {/* Image Section */}
          <div className="col-12 col-lg-5">
            <div
              className="border rounded shadow-sm p-3"
              style={{
                width: '100%',
                height: '400px',
                overflow: 'hidden',
              }}
            >
              {activeImg && (
                <img
                  className="img-fluid w-100 rounded"
                  src={activeImg}
                  alt={food?.name || 'Food Image'}
                  style={{ maxHeight: '400px', objectFit: 'contain' }}
                />
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="d-flex gap-2 mt-3 flex-wrap">
              {food?.images.map((img, index) => (
                <img
                  key={index}
                  onClick={() => setActiveImg(img?.url)}
                  src={img?.url}
                  alt={img?.url}
                  className={`img-thumbnail ${img?.url === activeImg ? 'border-danger' : ''}`}
                  style={{
                    height: '80px',
                    width: '80px',
                    objectFit: 'contain',
                    cursor: 'pointer',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="col-12 col-lg-7">
            <h3 className="fw-bold">{food?.name}</h3>
            <p className="text-muted">{food?._id}</p>

            <div className="d-flex align-items-center mb-3">
              <div className="text-warning fs-6">
                <StarRatings
                  rating={food?.ratings}
                  starRatedColor="#ffb829"
                  numberOfStars={5}
                  name="rating"
                  starDimension="22px"
                  starSpacing="1px"
                />
              </div>
              <span className="text-muted ms-2">({food?.numOfReviews} Review)</span>
            </div>

            <h4 className="text-success fw-bold">${food?.price}</h4>

            {/* Quantity & Add to Cart */}
            <div className="d-flex align-items-center mb-3">
              <div className="input-group" style={{ maxWidth: '140px' }}>
                <button className="btn btn-danger" onClick={decreaseQty}>
                  -
                </button>
                <input
                  type="number"
                  className="form-control count text-center"
                  value={quantity}
                  readOnly
                />
                <button className="btn btn-primary" onClick={increaseQty}>
                  +
                </button>
              </div>
              <button
                className="btn btn-danger ms-3"
                disabled={food?.stock <= 0}
                onClick={setCartToItem}
              >
                <i className="fa fa-cart-plus me-2"></i>Add to Cart
              </button>
            </div>

            {/* Stock Availability */}
            <p className="mb-1">
              <strong>Status:</strong>{' '}
              <span className={food?.stock > 0 ? 'text-success' : 'text-danger'}>
                {food?.stock > 0 ? 'is Available' : 'is Unavailable'}
              </span>
            </p>

            <hr />

            <h5>Description:</h5>
            <p className="text-muted">{food?.description}</p>

            <p className="mb-3">
              <strong>Sold by:</strong> {food?.seller}
            </p>

            {/* Review Note */}
            {isAuthenticated ? (
              <NewReview foodId={food?._id} />
            ) : (
              <div className="alert alert-danger mt-4 mb-0" role="alert">
                Login to post your review.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reviews */}
      {food?.reviews?.length > 0 && <ListReviews reviews={food?.reviews} />}
    </>
  );
};

export default FoodDetails;
