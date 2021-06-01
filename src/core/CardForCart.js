import React, { useState, useEffect } from "react";

import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/carthelper";

const CardForCart = ({
	product,
	addtoCart = true,
	removeFromCart = false,
	setReload = (f) => f,
	reload = undefined,
}) => {
	const [redirect, setRedirect] = useState(false);
	const [count, setCount] = useState(1);

	// useEffect(() => {}, [count]);

	const addToCart = () => {
		addItemToCart(product, () => setRedirect(true));
	};

	const getARedirect = (redirect) => {
		if (redirect) {
			return <Redirect to="/cart" />;
		}
	};

	const increment = (productId) => {
		if (productId) {
		}
		product.quantity = product.quantity + 1;
		setCount((prev) => {
			return prev + 1;
		});
	};
	const decrement = (e) => {
		e.preventDefault();
		if (count > 1) {
			product.quantity = product.quantity - 1;
			setCount((prev) => {
				return prev - 1;
			});
		}
	};

	const showAddToCart = (addtoCart) => {
		return (
			addtoCart && (
				<button
					onClick={addToCart}
					className="btn btn-block btn-outline-success mt-2 mb-2"
				>
					Add to Cart
				</button>
			)
		);
	};

	const showRemoveFromCart = (removeFromCart) => {
		return (
			removeFromCart && (
				<button
					onClick={() => {
						removeItemFromCart(product._id);
						setReload(!reload);
					}}
					className="btn btn-block  mt-2 mb-2"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="red"
						className="bi bi-trash-fill"
						viewBox="0 0 16 16"
					>
						<path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
					</svg>
				</button>
			)
		);
	};
	return (
		<div className="card py-2 px-2 mx-1 my-2">
			{getARedirect(redirect)}

			<div className="d-flex justify-content-around">
				<div className="col-4">
					<h5 className=" fw-bold mt-3 mb-2">{product.name}</h5>
				</div>
				<div className="col-2">
					<h5 className="fw-bolder fs-6 mt-3 mb-2">{product.price}</h5>
				</div>
				<div className=" col-2 mt-2 mb-2">
					<div className="row">
						<div className="col-4">
							<button onClick={decrement}>-</button>
						</div>

						<div className="col-4 flexdiv">
							<p>{product.quantity}</p>
						</div>

						<div className="col-4">
							<button onClick={() => increment(product._id)}>+</button>
						</div>
					</div>
				</div>
				<div className="col-3 d-flex justify-content-center">
					<h5 className="fw-bolder fs-6 mt-3 mb-2">45</h5>
				</div>

				<div className="col-1">
					<div className="col-12">{showAddToCart(addtoCart)}</div>
					<div className="col-12">{showRemoveFromCart(removeFromCart)}</div>
				</div>
			</div>
		</div>
	);
};

export default CardForCart;
