import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { decksApiSlice } from './decksApiSlice';

export const createDeck = createAsyncThunk(
    'deck/createDeck',
    async (name, thunkAPI) => {
        try {
            const response = await decksApiSlice.createDeck(name);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const deleteDeck = createAsyncThunk(
    'deck/deleteDeck',
    async (deckId, thunkAPI) => {
        try {
            await decksApiSlice.deleteDeck(deckId);
            return deckId;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const deckSlice = createSlice({
    name: 'deck',
    initialState: {
        deckInfo: null,
        creatingDeck: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createDeck.pending, (state) => {
            state.creatingDeck = true;
            state.error = null;
        });
        builder.addCase(createDeck.fulfilled, (state, action) => {
            state.creatingDeck = false;
            state.deckInfo = action.payload;
        });
        builder.addCase(createDeck.rejected, (state, action) => {
            state.creatingDeck = false;
            state.error = action.payload;
        });
        builder.addCase(deleteDeck.pending, (state) => {
            state.deletingDeck = true;
            state.error = null;
        })
        builder.addCase(deleteDeck.fulfilled, (state, action) => {
            state.deletingDeck = false;
            state.deckInfo = state.deckInfo.filter(deck => deck._id !== action.payload);
        })
        builder.addCase(deleteDeck.rejected, (state, action) => {
            state.deletingDeck = false;
            state.error = action.payload;
        });
    },
});

export default deckSlice.reducer;
