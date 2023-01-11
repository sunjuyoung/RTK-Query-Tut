import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const notesAdapter = createEntityAdapter({})
const initialState = notesAdapter.getInitialState();


export const notesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      getNotes: builder.query({
        query: () => '/api/member',
        validateStatus:(response,result)=>{
            return response.status === 200 && !result.isError
        },
        transformResponse: responseData => {
            return notesAdapter.setAll(initialState, responseData)
        },

        providesTags: (result, error, arg) => {
            if (result?.ids) {
                return [
                    { type: 'User', id: 'LIST' },
                    ...result.ids.map(id => ({ type: 'User', id }))
                ]
            } else return [{ type: 'User', id: 'LIST' }]
        }
      }),
    }),
  })

  export const {
    useGetNotesQuery,
} = notesApiSlice

export const selectNotesResult = notesApiSlice.endpoints.getUsers.select()

const selectNotesData = createSelector(
    selectNotesResult,
   
)

export const {
    selectAll: selectAllNotes,
    selectById: selectNoteById,
    selectIds: selectNoteIds
    // Pass in a selector that returns the users slice of state
} = notesAdapter.getSelectors(state => selectNotesData(state) ?? initialState)