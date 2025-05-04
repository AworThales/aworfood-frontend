import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiUrl = import.meta.env.VITE_API_URL;

export const foodApi = createApi({
  reducerPath: "foodApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    credentials: "include",
  }),
  tagTypes: ["Food", "AdminFoods", "Reviews"],  //help to refresh our data with reloading the page
  endpoints: (builder) => ({
    // Get all foods endpoint
    getFoods: builder.query({
      query: (params) => ({
        url: "/foods",
        params: {
          page: params?.page,
          keyword: params?.keyword,
        //   "price[gte]": params?.min,
        //   "price[lte]": params?.max,
          "price[gte]": params.max,
          "price[lte]": params.min,
          category: params?.category,
          "ratings[gte]": params?.ratings,
        },
      }),
    }),

    // Food detail endpoint
    getFoodDetails: builder.query({
      query: (id) => ({
        url: `/foods/${id}`,
      }),
      providesTags: ["Food"],
    }),

    // Submit a review
    submitReview: builder.mutation({
      query: (body) => ({
        url: "/reviews",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Food"],
    }),

    // Check if user can review
    canUserReview: builder.query({
      query: (foodId) => ({
        url: `/can_review?foodId=${foodId}`,
      }),
    }),

    getAdminFoods: builder.query({
      query: () => ({
        url: `/admin/foods`,
      }),
      providesTags: ["AdminFoods"],  //help to refresh our data with reloading the page
    }),

    
    createFood: builder.mutation({
      query: (body) => ({
        url: "/admin/foods",
        method: "POST",
        body,
      }),
      invalidatesTags: ["AdminFoods"] //help to refresh our data with reloading the page
    }),

    updateFood: builder.mutation({
      query: ({ id, body }) => ({
        url: `/admin/foods/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Food", "AdminFoods"] //help to refresh our data with reloading the page
    }),

    uploadFoodImages: builder.mutation({
      query: ({ id, body }) => ({
        url: `/admin/foods/${id}/upload_images`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Food"] //refetch the new data of the food
    }),

    deleteFoodImage: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/foods/${id}/delete_image`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Food"], //refetch the new data of the food
    }),

    deleteFood: builder.mutation({
      query(id) {
        return {
          url: `/admin/foods/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["AdminFoods"], //refetch the new data of the food
    }),

     // get food review
    getFoodReviews: builder.query({
      query: (foodId) => `/reviews?id=${foodId}`,
      providesTags: ["Reviews"],
    }),

    deleteReview: builder.mutation({
      query({ foodId, id }) {
        return {
          url: `/admin/reviews?foodId=${foodId}&id=${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Reviews"],
    }),

  }),
});

// Export hooks for usage in components
export const {
  useGetFoodsQuery,
  useGetFoodDetailsQuery,
  useSubmitReviewMutation,
  useCanUserReviewQuery,
  useGetAdminFoodsQuery,
  useCreateFoodMutation,
  useUpdateFoodMutation,
  useUploadFoodImagesMutation,
  useDeleteFoodImageMutation,
  useDeleteFoodMutation,
  useLazyGetFoodReviewsQuery,
  useDeleteReviewMutation,
} = foodApi;
