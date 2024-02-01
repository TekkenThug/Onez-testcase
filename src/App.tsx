import ConverterWidget from "./components/converter-widget/ConverterWidget.tsx";

import styles from "./App.module.css"
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setCurrencies} from "@/stores/currency.ts";
import {RootState} from "@/stores";
import Loader from "@/components/loader/Loader.tsx";

function App() {
	const currencies = useSelector((state: RootState) => state.currency.currencyList)
	const [isLoading, setIsLoading] = useState(true)
	const dispatch = useDispatch();
	const getCurrentCurrencies = async () => {
		try {
			const data: string[] = await fetch("https://currency-exchange.p.rapidapi.com/listquotes", {
				headers: {
					"X-RapidAPI-Key": import.meta.env.VITE_API_KEY_CURRENCIES,
					"X-RapidAPI-Host": "currency-exchange.p.rapidapi.com"
				}
			}).then(res => res.json())

			dispatch(setCurrencies(data))
			setIsLoading(false)
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

			{ isLoading || currencies.length < 2  ? <Loader size={120} /> :  <ConverterWidget /> }
		</div>
	)
}

export default App
