import { apiSlice } from "./apiSlice";
const DECK_URL = '/api/decks';

export const decksApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDecks: builder.query({
            query: () => ({
                url: `${DECK_URL}/mydecks`
            }),
            providesTags: ['Deck']
        }),
        createDeck: builder.mutation({
            query: (name) => ({
                url: `${DECK_URL}`,
                method: 'POST',
                body: { name }
            })
        }),
        deleteDeck: builder.mutation({
            query: (deckId) => ({
                url: `${DECK_URL}/${deckId}`,
                method: 'DELETE'
            })
        })
    })
});


//export const useGetDecks = decksApiSlice.endpoints.getDecks.useQuery;
export const { useGetDecksQuery, useCreateDeckMutation, useDeleteDeckMutation } = decksApiSlice;