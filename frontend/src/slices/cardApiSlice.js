import { apiSlice } from "./apiSlice";
const CARD_URL = '/api/cards'

export const cardApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCards: builder.query({
            query: (deckId) => ({
                url: `${CARD_URL}/mycards/${deckId}`
            }),
            providesTags: ['Card']
        }),
        createCard: builder.mutation({
            query: ({ front, back, deckId }) => ({
                url: `${CARD_URL}`,
                method: 'POST',
                body: { front, back, deckId }
            })
        })
    })
})

export const { useGetCardsQuery, useCreateCardMutation } = cardApiSlice;