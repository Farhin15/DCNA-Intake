import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const apiSlice = createApi({
    reducerPath: 'apiSlice',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://13.234.226.222:8000/api/',
    }),
    // tagTypes: ['Post'],
    endpoints: (builder) => {
        return ({
            // getPosts: builder.query({
            //     query: () => '/intake-form',
            //     providesTags: ['Post'],
            // }),
            addNewPost: builder.mutation({
                query: ({ url, method, payload }) => {
                    return ({
                        url: url,
                        method: method,
                        body: payload,
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                        },
                    })
                },
                invalidatesTags: ['Post'],
            }),
        })
    },
})
export const { useGetPostsQuery, useAddNewPostMutation } = apiSlice