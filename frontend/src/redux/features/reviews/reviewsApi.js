import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getBaseUrl } from '../../../utils/baseURL'
import { post } from '../../../../../backend/src/reviews/reviews.router'

export const reviewApi = createApi({
    reducerPath: 'reviewApi',
    baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/reviews`,
    credentials: 'include',
    }),
    tagTypes: ['Review'],
    endpoints: (builder) => ({
   postRevew: builder.mutation({
        query: (reviewData) => ({
            url: '/post-review',
            method: 'POST',
            body: reviewData,
        }),
        invalidatesTags: (result, error, {postId})=> [{type: "Reviews", id:postId}]
    }),
    getReviewsCount: builder.query({
        query: () => ({
            url: '/total-reviews',
         
        })
    }),
    getReviewsByUserId: builder.query({
        query: (userId) => ({
            url: `/${userId}`,
        }),
        providesTags: (result) => result ? [{type: "Reviews", id: result[0]?.email}]:[]
    })
})
})


export const {usePostRevewMutation, useGetReviewsCountQuery, useGetReviewsByUserIdQuery} = reviewApi;
export default reviewApi;

