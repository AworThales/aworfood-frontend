import React, { useEffect, useState } from 'react';
import StarRatings from 'react-star-ratings';
import { useCanUserReviewQuery, useSubmitReviewMutation } from '../../redux/api/foodApi';
import toast from 'react-hot-toast';

const NewReview = ({ foodId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const [submitReview, { isLoading, error, isSuccess }] = useSubmitReviewMutation();
  const { data } = useCanUserReviewQuery(foodId);

  const canReview = data?.canReview;

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("Review Posted");
      setRating(0);
      setComment('');
    }
  }, [error, isSuccess]);

  const submitReviewHandler = () => {
    const reviewData = { rating, comment, foodId };
    submitReview(reviewData);
  };

  return (
    <div>
      {/* Submit Review Button (opens modal) */}
      {canReview && (
        <button
          id="review_btn"
          type="button"
          className="btn btn-danger mt-4"
          data-bs-toggle="modal"
          data-bs-target="#ratingModal"
        >
          Submit Review
        </button>
      )}

      {/* Review Modal */}
      <div className="row mt-2 mb-5">
        <div className="rating w-50">
          <div
            className="modal fade"
            id="ratingModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="ratingModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">

                {/* Modal Header */}
                <div className="modal-header">
                  <h5 className="modal-title" id="ratingModalLabel">
                    Submit Review
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>

                {/* Modal Body */}
                <div className="modal-body">
                  <StarRatings
                    rating={rating}
                    starRatedColor="#ffb829"
                    numberOfStars={5}
                    name="rating"
                    changeRating={(e) => setRating(e)}
                  />

                  <textarea
                    name="review"
                    id="review"
                    className="form-control mt-4"
                    placeholder="Enter your comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>

                  <button
                    id="new_review_btn"
                    className="btn bg-danger w-100 my-4 px-4"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={submitReviewHandler}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Submitting...' : 'Submit'}
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewReview;
