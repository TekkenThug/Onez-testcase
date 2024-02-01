import styles from "./Loader.module.css";
import LoaderIcon from "@/assets/svg/loader.svg";
import {FC} from "react";

interface Props {
	size: number
}

const Loader: FC<Props> = ({ size}) => {
	const inlineStyles = {
		width: `${size}px`,
		height: `${size}px`,
	}

	return (
		<div className={styles.Loader} style={inlineStyles}>
			<img src={LoaderIcon} alt="loader" />
		</div>
	)
}

export default Loader;
