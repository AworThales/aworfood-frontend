import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
const apiUrl = import.meta.env.VITE_API_URL; 

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({baseUrl: `${apiUrl}`, credentials: 'include',}),
    tagTypes: ['Order', 'AdminOrder', 'AdminOrders'],
    endpoints: (builder) => ({
        // order api endpoint - mututation for posting
    
        createNewOrder: builder.mutation({
            query(body) {
                return {
                    url: "/orders/new",
                    method: "POST",
                    body
                }
            }
        }),

        // my orders api endpoint
        myOrders: builder.query({
            query: () => '/me/orders',
        }),

        // order details api endpoint
        orderDetails: builder.query({
            query: (id) => `/orders/${id}`,
            providesTags: ['Order']
        }),

        // stripe payment endpoint
        stripeCheckoutSession: builder.mutation({
            query(body) {
                return {
                    url: "/payment/checkout_session",
                    method: "POST",
                    body
                }
            }
        }),

        getDashboardSales: builder.query({
            query: ({startDate, endDate}) => `/admin/get_sales/?startDate=${startDate}&endDate=${endDate}`,
        }),


         // all orders api endpoint
         getAdminOrders: builder.query({
            query: () => '/admin/orders',
            providesTags: ['AdminOrders']
        }),

        updateOrder: builder.mutation({
            query({id, body}) {
                return {
                    url: `/admin/orders/${id}`,
                    method: "PUT",
                    body
                }
            },
            invalidatesTags: ["Order"]
        }),

        deleteOrder: builder.mutation({
            query(id) {
                return {
                    url: `/admin/orders/${id}`,
                    method: "DELETE",
                }
            },
            invalidatesTags: ["AdminOrders"]
        }),


    }),
});


// export our endpoint and  this will return data, error, and success for us
export const { 
    useCreateNewOrderMutation, 
    useStripeCheckoutSessionMutation, 
    useMyOrdersQuery,
    useOrderDetailsQuery,
    useLazyGetDashboardSalesQuery,
    useGetAdminOrdersQuery,
    useUpdateOrderMutation,
    useDeleteOrderMutation,
 } = orderApi;