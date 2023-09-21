import React from "react";
// import Icon from '../../components/icon';
import { FormErrorProps } from "./interface";

const FormError = ({ error }: FormErrorProps) => {
	return (
		<div className={`flex flex-row items-center gap-2 mt-2 text-[red] text-sm`}>
			{/* <Icon name='' /> */}
			<p>{error}</p>
		</div>
	);
};

export default FormError;
