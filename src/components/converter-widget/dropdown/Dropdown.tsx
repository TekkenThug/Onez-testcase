import styles from "./Dropdown.module.css";
import { FC, RefObject, useEffect, useRef, useState } from "react";
import CurrencyFlag from "react-currency-flags";

interface Props {
	currencies: string[],
	onClick: (currency: string) => void,
	onClickOutside: (event: Event) => void,
}

const useOutsideClick = (ref: RefObject<HTMLUListElement>, cb: (event: Event) => void) => {
    useEffect(() => {
        const handleClickOutside = (event: Event) => {
            if (ref.current && !ref.current.contains((event.target as HTMLUListElement))) {
                cb(event);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
};

const Dropdown: FC<Props> = ({ currencies, onClick, onClickOutside }) => {
    const [text, setText] = useState("");
    const listRef = useRef<HTMLUListElement>(null);
    useOutsideClick(listRef, onClickOutside);

    return (
        <ul className={ styles.Dropdown } ref={ listRef }>
            <li className={ styles.search }>
                <input
                    type="text"
                    placeholder="Search"
                    value={ text }
                    onInput={ (event) => setText(event.currentTarget.value) }
                />
            </li>

            { currencies.filter(item => item.toLowerCase().includes(text.toLowerCase())).map((item, index) => (
                <li className={ styles.item } onClick={ () => onClick(item) } key={ index }>
                    <CurrencyFlag currency={ item } width={ 20 }/> { item }
                </li>
            ))}
        </ul>
    );
};

export default Dropdown;
