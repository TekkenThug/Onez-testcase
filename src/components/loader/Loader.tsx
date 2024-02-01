import styles from "./Loader.module.css";
import LoaderIcon from "@/assets/svg/loader.svg";
import {FC} from "react";

interface Props {
	size: number,
	className?: string
}

const Loader: FC<Props> = ({ size, className = ""}) => {
	const inlineStyles = {
		width: `${size}px`,
		height: `${size}px`,
	}

	return (
		<div className={`${styles.Loader} ${className}`} style={inlineStyles}>
			<img src={LoaderIcon} alt="loader" />
		</div>
	)
}

export default Loader;
