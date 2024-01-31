import { configureStore } from "@reduxjs/toolkit"
import currencyReduces from "@/services/currency"

export const store = configureStore({
	reducer: {
		currency: currencyReduces
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
