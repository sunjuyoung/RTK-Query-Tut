import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const usersAdapter = createEntityAdapter([])
const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      getUsers: builder.query({
        query: () => '/api/member',
        transformResponse: responseData => {
            return usersAdapter.setAll(initialState, responseData)
        },

        providesTags: (result, error, arg) => 
        [
            { type: 'User', id: 'LIST' },
            ...result.ids.map(id => ({ type: 'User', id }))
        ]
      }),

      addNewUser: builder.mutation({
        query: initialUserData => ({
          url: '/api/member/register',
          method: 'POST',
          body :{
            ...initialUserData,
          }
        }),
        invalidatesTags: [{ type:'User', id: "LIST" }]
      }),

      updateUser: builder.mutation({
        query: ({...initialUserData}) => ({
          url: `/api/member/${initialUserData.memberId}`,
          method: 'PUT',
          body :{
            ...initialUserData,
          }
        }),
        invalidatesTags: (result,error,arg) => [{ type:'User', id: arg.id }]
      }),

      deleteUser: builder.mutation({
        query: ({id}) => ({
          url: `/api/member/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: (result,error,arg) => [{ type:'User', id: arg.id }]
      }),

    }),
   // overrideExisting: false,
  })

  export const {
    useGetUsersQuery,
    useDeleteUserMutation,
    useUpdateUserMutation,
    useAddNewUserMutation,
} = usersApiSlice

export const selectUsersResult = usersApiSlice.endpoints.getUsers.select()

// normalized state object with ids & entities
const selectUsersData = createSelector(selectUsersResult,usersResult => usersResult.data )


export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds
    // Pass in a selector that returns the users slice of state
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState)