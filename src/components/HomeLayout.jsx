import React, { useEffect } from 'react';
import MetaData from './layout/MetaData';
import { useGetFoodsQuery } from '../redux/api/foodApi';
import FoodItem from './food/FoodItem';
import LoadingSpinner from './layout/LoadingSpinner';
import toast from 'react-hot-toast';
import CustomPagination from './layout/CustomPagination';
import { useSearchParams } from 'react-router-dom';

const HomeLayout = () => {
  let [searchParams] = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;
  const keyword = searchParams.get('keyword') || "";
  const min = searchParams.get("min");
  const max = searchParams.get("max");
  const category = searchParams.get("category");
  const ratings = searchParams.get("ratings");

  const params = { page, keyword };
  if (min !== null && !isNaN(min)) params.min = Number(min);
  if (max !== null && !isNaN(max)) params.max = Number(max);
  if (category !== null) params.category = category;
  if (ratings !== null) params.ratings = ratings;

  const hasFilters = keyword || min || max || category || ratings;

  const { data, isLoading, isError, error } = useGetFoodsQuery(params);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError, error?.data?.message]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <MetaData title={"Get Fresh Food Online"} />

      <div className="container mt-4">
        <div className="row">
          <div className="col-12 col-sm-6 col-md-12">
            {/* Show result count or no-results message if filters/search are active */}
            {hasFilters && (
              <div className="mb-4 text-center">
                {data?.foods?.length > 0 ? (
                  <h4 className="text-success">
                    Found {data.foods.length} result{data.foods.length > 1 ? 's' : ''}{' '}
                    {keyword && (
                      <>for "<span className="text-primary">{keyword}</span>"</>
                    )}
                  </h4>
                ) : (
                  <div className="alert alert-warning p-4 rounded shadow-sm">
                    <h4 className="text-danger mb-2">No results found</h4>
                    <p>
                      We couldn’t find any items matching your filters.
                      {keyword && (
                        <> Search keyword: "<strong>{keyword}</strong>".</>
                      )}
                      <br />
                      Try adjusting your filters or search.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Food List */}
            <section id="products" className="mt-3">
              <div className="row">
                {data?.foods?.map((food) => (
                  <FoodItem key={food._id} food={food} />
                ))}
              </div>
            </section>
          </div>

          {/* Pagination - only when no filters or search */}
          {!hasFilters && (
            <CustomPagination
              resPerPage={data?.resPerPage}
              filteredFoodsCount={data?.filteredFoodsCount}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default HomeLayout;
