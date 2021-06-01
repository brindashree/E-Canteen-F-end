import React from "react";
import { API } from "../../backend";

const ImageHelper = ({ product }) => {
	const imageurl = product
		? `${API}/product/photo/${product._id}`
		: `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;
	return (
		<div className="rounded card-img">
			<img
				src={imageurl}
				alt=" "
				style={{ maxHeight: "100%", maxWidth: "100%" }}
				className="mb-1 rounded"
			/>
		</div>
	);
};
export default ImageHelper;
