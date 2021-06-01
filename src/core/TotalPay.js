import { useState, useEffect } from "react";

const TotalPay = (props) => {
	const { itemtotal } = props;
	const [arr, setarr] = useState([]);

	useEffect(() => {
		arr.push(itemtotal);
		console.log("Total:" + arr);
	}, []);
	return <span>{itemtotal}</span>;
};
export default TotalPay;
