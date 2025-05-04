import React, { useEffect, useState } from 'react'
import AdminLayout from '../layout/AdminLayout'
import { MDBDataTable } from 'mdbreact';
import LoadingSpinner from '../layout/LoadingSpinner';
import MetaData from '../layout/MetaData';
import toast from 'react-hot-toast';
import { useDeleteReviewMutation, useLazyGetFoodReviewsQuery } from '../../redux/api/foodApi';

const FoodReview = () => {
    const [foodId, setFoodId] = useState("");

    const [getFoodReviews, {isLoading, error, data}] = useLazyGetFoodReviewsQuery()


    const [deleteReview, {isLoading: isDeleteLoading, error: deleteError, isSuccess: deleteSuccess}] = useDeleteReviewMutation()

     useEffect(() => {
        if (error) {
            toast.error(error?.data?.message );
        } 

        
        if(deleteError) {
            toast.error(deleteError?.data.message)
        }
    
        if(deleteSuccess) {
            toast.success("Review deleted successfully")
        }
        
    
        }, [error, deleteError, deleteSuccess]);
    

    const submitHandler = (e) => {
        e.preventDefault();
        getFoodReviews(foodId)
    }

    const deleteReviewhandler = (id) => {
      deleteReview({foodId, id})
    }

    const setReviews = () => {
        const reviews = {
            columns: [
                {
                    label: "ID",
                    field: "id",
                    sort: "asc",
                },
                {
                    label: "Rating",
                    field: "rating",
                    sort: "asc",
                },
                {
                    label: "Comment",
                    field: "comment",
                    sort: "asc",
                },
                {
                    label: "User",
                    field: "review",
                    sort: "asc",
                },
                {
                    label: "Actions",
                    field: "actions",
                    sort: "asc",
                },
            ],
            rows: [],
        };

        data?.reviews?.forEach((review) => {
            reviews.rows.push({
                id: review?._id,
                rating: review?.rating,
                comment: review?.comment,
                user: review?.user?.name,
                actions: 
                    <div className="d-flex gap-2 justify-content-center">
                        <button 
                            onClick={() => deleteReviewhandler(review?._id)}
                            disabled={isDeleteLoading} 
                            className='btn btn-outline-danger ms-2' 
                            title="Delete Review"
                        >
                            <li className="fa fa-trash"></li>
                        </button>
                    </div>
            })
        })

        return reviews;
    };
          
    
    if (isLoading) return <LoadingSpinner />
        

  return (
    <AdminLayout>
        <MetaData title={"Product Reviews"} />

      <div className="row justify-content-center my-5">
      <div className="col-6">
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="productId_field" className="form-label">
              Enter Food ID
            </label>
            <input
              type="text"
              id="productId_field"
              className="form-control"
              value={foodId}
              onChange={(e) => setFoodId(e.target.value)}
            />
          </div>

          <button
            id="search_button"
            type="submit"
            className="btn btn-primary w-100 py-2"
          >
            SEARCH
          </button>
        </form>
      </div>
    </div>

    
      {data?.reviews?.length > 0 ? (
        <MDBDataTable
            data={setReviews()}
            className="px-3 table table-hover"
            bordered
            striped
            responsive
            hover
        />

      ) : (
        <p className="mt-5 text-center">No Reviews</p>
      )}
    </AdminLayout>
  )
}

export default FoodReview
