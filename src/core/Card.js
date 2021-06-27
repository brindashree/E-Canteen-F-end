import React, { useState } from "react";
import ImageHelper from "./helper/ImageHelper";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/carthelper";

const Card = ({
	product,
	addtoCart = true,
	removeFromCart = false,
	setReload = (f) => f,
	reload = undefined,
}) => {
	const [redirect, setRedirect] = useState(false);

	const addToCart = () => {
		addItemToCart(product, () => setRedirect(true));
	};

	const getARedirect = (redirect) => {
		if (redirect) {
			return <Redirect to="/cart" />;
		}
	};

	const showAddToCart = (addtoCart) => {
		return (
			addtoCart && (
				<button onClick={addToCart} className="addbtn btn btn-block mt-3">
					Add to Cart
				</button>
			)
		);
	};

	return (
		<div className="menu-item">
			{getARedirect(redirect)}
			<ImageHelper product={product} />
			<div className="item-info">
				<header>
					<h4 className="name">{product.name}</h4>
					<h4 className="price">₹ {product.price}</h4>
				</header>
				<p className="item-text">{product.description}</p>
				<div className="d-flex justify-content-end">
					{showAddToCart(addtoCart)}
				</div>
			</div>
		</div>
	);
};

export default Card;

// <span className="btn btn-success rounded  btn-sm  fs-6">
// 	<svg
// 		xmlns="http://www.w3.org/2000/svg"
// 		width="16"
// 		height="16"
// 		fill="currentColor"
// 		className="bi bi-star-fill"
// 		viewBox="0 0 16 16"
// 	>
// 		<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
// 	</svg>
// 	<span className="ps-3 fs-6">5.5</span>
// </span>;

// <div>{showAddToCart(addtoCart)}</div>;
