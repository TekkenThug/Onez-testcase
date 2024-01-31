import ConverterWidget from "./components/converter-widget/ConverterWidget.tsx";

import styles from "./App.module.css"
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setCurrencies} from "@/services/currency.ts";
import {RootState} from "@/store.ts";

function App() {
	const currencies = useSelector((state: RootState) => state.currency.currencyList)
	const dispatch = useDispatch();
	const getCurrentCurrencies = async () => {
		try {
			const data = await fetch("https://currency-exchange.p.rapidapi.com/listquotes", {
				headers: {
					"X-RapidAPI-Key": import.meta.env.VITE_API_KEY_CURRENCIES,
					"X-RapidAPI-Host": "currency-exchange.p.rapidapi.com"
				}
			}).then(res => res.json())

			dispatch(setCurrencies(data))
		} catch (e) {
			console.warn(e);
		}
	};

	useEffect(() => {
		getCurrentCurrencies();
	}, [])

	return (
		<div className={styles.App}>
			<div className={styles.top}>
				<h1 className={styles.topTitle}>Currency Converter</h1>

				<p className={styles.topSubtitle}>
					Check live rates, set rate alerts, receive notifications and more.
				</p>
			</div>

			{ currencies.length > 0 && <ConverterWidget /> }
		</div>
	)
}

export default App
