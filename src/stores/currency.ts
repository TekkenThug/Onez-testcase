import { createSlice } from "@reduxjs/toolkit";

export interface CurrencyState {
	currencyList: string[]
}

const initialState: CurrencyState = {
    currencyList: [],
};

export const currencySlice = createSlice({
    name: "currency",
    initialState,
    reducers: {
        setCurrencies: (state, action) => {
            state.currencyList = action.payload;
        }
    },
});

export const { setCurrencies } = currencySlice.actions;

export default currencySlice.reducer;
