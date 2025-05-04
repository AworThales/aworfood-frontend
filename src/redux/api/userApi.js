import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { setIsAuthenticated, setLoading, setUser } from "../features/userSlice";
const apiUrl = import.meta.env.VITE_API_URL; 

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
      baseUrl: `${apiUrl}`,
      credentials: 'include',  // Ensure credentials (cookies) are included in the request
    }),
    tagTypes: ['User', "AdminUser", 'AdminUsers'],
    endpoints: (builder) => ({
      getMe: builder.query({
        query: () => '/me',
        transformResponse: (result) => result.user,
        async onQueryStarted(args, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            dispatch(setUser(data));  // Set user data in Redux state
            dispatch(setIsAuthenticated(true));  // Set isAuthenticated to true
            dispatch(setLoading(false));
          } catch (error) {
            console.log(error);
            dispatch(setLoading(false));
          }
        },
        providesTags: ['User'],
      }),
      
    //   update user
      updateProfile: builder.mutation({
        query(body) {
            return {
                url: "/me/update",
                method: "PUT",
                body,
            };
        },
        invalidatesTags: ['User'], //refetching the data of the user thats's to refresh user data once profile is updated
      }),

      // upload user image
      uploadAvatar: builder.mutation({
        query(body) {
            return {
                url: "/me/upload_avatar",
                method: "PUT",
                body,
            };
        },
        invalidatesTags: ['User'], //refetching the data of the user thats's to refresh user data once profile is updated
      }),

      // upload user image
      updatePassword: builder.mutation({
        query(body) {
            return {
                url: "/me/password/update",
                method: "PUT",
                body,
            };
        },
      }),

      // forgot password api
      forgotPassword: builder.mutation({
        query(body) {
            return {
                url: "/password/forgot",
                method: "POST",
                body,
            };
        },
      }),

      // reset password api
      resetPassword: builder.mutation({
        query({token, body}) {
            return {
                url: `/password/reset/${token}`,
                method: "PUT",
                body,
            };
        },
      }),

      getAdminUsers: builder.query({
        query: () => '/admin/users',
        providesTags: ['AdminUsers']
      }),

      getUserDetails: builder.query({
        query: (id) => `/admin/users/${id}`,
        providesTags: ['AdminUser']
      }),

      updateUser: builder.mutation({
        query({id, body}) {
            return {
                url: `/admin/users/${id}`,
                method: "PUT",
                body,
            };
        },
        invalidatesTags: ['AdminUsers']
      }),

      deleteUser: builder.mutation({
        query(id) {
            return {
                url: `/admin/users/${id}`,
                method: "DELETE",
            };
        },
        invalidatesTags: ['AdminUsers'],
      }),

    }),
  });
  
  export const { 
    useGetMeQuery, 
    useUpdateProfileMutation, 
    useUploadAvatarMutation,
    useUpdatePasswordMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useGetAdminUsersQuery,
    useGetUserDetailsQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
   } = userApi;
  