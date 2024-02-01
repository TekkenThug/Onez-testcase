import styles from "./ConverterWidget.module.css"
import Arrows from "@/assets/svg/arrow-swap.svg"
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import {useEffect, useState, useRef} from "react";
import CurrencyFlag from "react-currency-flags";
import Loader from "@/assets/svg/loader.svg";
import Dropdown from "@/components/converter-widget/dropdown/Dropdown.tsx";
import ArrowDown from "@/assets/svg/arrow-down.svg";

interface APIResponse {
	amount: string;
	base_currency_code: string;
	base_currency_name: string;
	rates: {
		[key: string]: {
			currency_name: string;
			rate: string;
			rate_for_amount: string;
		}
	}
	status: string;
	updated_date: string;
}

const ConverterWidget = () => {
	const currencies = useSelector((state: RootState) => state.currency.currencyList)

	const [initialValue, setInitial] = useState<number>(0);
	const [convertedValue, setConverted] = useState<number>(0);

	const [mainCurrency, setMainCurrency] = useState<string>(currencies[0]);
	const [convertedCurrency, setConvertedCurrency] = useState<string>(currencies[1]);
	const [rate, setRate] = useState(0);

	const [isLoading, setIsLoading] = useState(false);
	const [isSwitched, setIsSwitched] = useState(false);
	const [activeDropdown, setDropdown] = useState<"main" | "converted" | null>(null);

	const [error, setError] = useState("")
	const validateInput = () => {
		// Some logic to validation
		setError("");
	}
	const fetchConverted = async () => {
		validateInput();
		if (!convertedCurrency || error) return;

		try {
			setIsLoading(true);
			const url = `https://api.getgeoapi.com/v2/currency/convert?api_key=${import.meta.env.VITE_API_KEY_EXCHANGE}&from=${mainCurrency}&to=${convertedCurrency}&amount=${initialValue}&format=json`;
			const data: APIResponse = await fetch(url).then(res => res.json());

			setConverted(Number(data.rates[convertedCurrency].rate_for_amount));
			setRate(Number(data.rates[convertedCurrency].rate));
			setIsLoading(false);
			setIsSwitched(false);
		} catch (e) {
			console.warn(e);
		}
	}
	const inputHandler = async (value: string) => {
		setInitial(Number(value))
	}

	useEffect(() => {
		fetchConverted();
	}, [initialValue, mainCurrency, convertedCurrency]);

	const changeCurrencies = () => {
		setIsSwitched(true);
		const converted = convertedCurrency;
		setConvertedCurrency(mainCurrency);
		setMainCurrency(converted);
	}

	const firstSelect = useRef<HTMLDivElement>(null);
	const secondSelect = useRef<HTMLDivElement>(null);
	const closeDropdown = (element: HTMLDivElement, comparedElement: Node) => {
		if (element.isEqualNode(comparedElement) || element.contains(comparedElement)) {
			return;
		}

		setDropdown(null);
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.ConverterWidget}>
				<div>
					<span className={styles.caption}>Amount</span>

					<div className={styles.controls}>
						<div className={styles.select}>
							<div
								ref={firstSelect}
								className={styles.selectImage}
								onClick={() => setDropdown(activeDropdown === "main" ? null : "main")}
							>
								<CurrencyFlag currency={mainCurrency} height={45}/>
							</div>

							<span className={styles.selectText}>{mainCurrency}</span>

							<img className={styles.selectArrowDown} src={ArrowDown} alt="arrow-down" />

							{ activeDropdown === "main" &&
                                <Dropdown
                                    currencies={currencies.filter(item => item !== mainCurrency)}
                                    onClick={(item) => item === convertedCurrency ? changeCurrencies() : setMainCurrency(item)}
                                    onClickOutside={(event) => closeDropdown((firstSelect.current as HTMLDivElement), (event.target as Node))}
                                />
							}
						</div>

						<div className={`${styles.inputWrapper} ${error && styles.inputWrapperWithError}`}>
							<span className={styles.inputError}>{ error }</span>

							<input
								value={initialValue}
								className={styles.input}
								type="number"
								onInput={e => inputHandler(e.currentTarget.value)}
							/>
						</div>
					</div>
				</div>

				<div className={styles.swapContainer}>
					<button
						disabled={isLoading}
						className={`${styles.swapButton} ${isSwitched && isLoading ? styles.loading : ""}`}
						onClick={changeCurrencies}
					>
						<img src={Arrows} alt="Arrows"/>
					</button>
				</div>

				<div>
					<span className={styles.caption}>Converted Amount</span>

					<div className={styles.controls}>
						<div className={styles.select}>
							<div
								ref={secondSelect}
								className={styles.selectImage}
								onClick={() => setDropdown(activeDropdown === "converted" ? null : "converted")}
							>
								<CurrencyFlag currency={convertedCurrency} height={45}/>
							</div>

							<span className={styles.selectText}>{convertedCurrency}</span>

							<img className={styles.selectArrowDown} src={ArrowDown} alt="arrow-down" />

							{ activeDropdown === "converted" &&
                                <Dropdown
                                    currencies={currencies.filter(item => item !== convertedCurrency)}
                                    onClick={(item) => item === mainCurrency ? changeCurrencies() : setConvertedCurrency(item)}
                                    onClickOutside={(event) => closeDropdown((secondSelect.current as HTMLDivElement), (event.target as Node))}
                                />
							}
						</div>

						<div className={styles.inputWrapper}>
							{isLoading ?
								<img
									src={Loader}
									alt="loader"
									className={styles.loader}
								/>
								:
								<input
									value={convertedValue}
									className={styles.input}
									type="number"
									disabled
									onInput={e => inputHandler(e.currentTarget.value)}
								/>
							}
						</div>
					</div>
				</div>
			</div>

			<div className={styles.bottom}>
				<h2 className={styles.bottomTitle}>
					Indicative Exchange Rate
				</h2>

				<strong className={styles.bottomValue}>1 { mainCurrency } = { rate } { convertedCurrency }</strong>
			</div>
		</div>
	)
}

export default ConverterWidget;
