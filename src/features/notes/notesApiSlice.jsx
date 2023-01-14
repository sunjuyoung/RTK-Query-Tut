import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const notesAdapter = createEntityAdapter({
  sortComparer:(a,b) =>  a.content.localeCompare(b.content),
  // sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})
const initialState = notesAdapter.getInitialState();


export const notesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      getNotes: builder.query({
        query: () => '/api/review',
        validateStatus:(response,result)=>{
            return response.status === 200 && !result.isError
        },
        transformResponse: responseData => {
            return notesAdapter.setAll(initialState, responseData)
        },

        providesTags: (result, error, arg) => {
            if (result?.ids) {
                return [
                    { type: 'Note', id: 'LIST' },
                    ...result.ids.map(id => ({ type: 'Note', id }))
                ]
            } else return [{ type: 'Note', id: 'LIST' }]
        }
      }),


      addNewNote: builder.mutation({
        query: initialUserData => ({
          url: '/api/review',
          method: 'POST',
          body :{
            ...initialUserData,
          }
        }),
        invalidatesTags: [{ type:'Note', id: "LIST" }]
      }),

      updateNote: builder.mutation({
        query: ({...initialUserData}) => ({
          url: `/api/review/${initialUserData.id}`,
          method: 'PATCH',
          body :{
            ...initialUserData,
          }
        }),
        invalidatesTags: (result,error,arg) => [{ type:'Note', id: arg.id }]
      }),

      deleteNote: builder.mutation({
        query: ({id}) => ({
          url: `/api/review/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: (result,error,arg) => [{ type:'Note', id: arg.id }]
      }),


    }),
  })

  export const {
    useGetNotesQuery,
    useDeleteNoteMutation,
    useUpdateNoteMutation,
    useAddNewNoteMutation,
} = notesApiSlice

export const selectNotesResult = notesApiSlice.endpoints.getNotes.select()

const selectNotesData = createSelector(selectNotesResult,notesResult => notesResult.data )

export const {
    selectAll: selectAllNotes,
    selectById: selectNoteById,
    selectIds: selectNoteIds
    // Pass in a selector that returns the users slice of state
} = notesAdapter.getSelectors(state => selectNotesData(state) ?? initialState)
//export const selectAll = notesAdapter.getSelectors(initialState)