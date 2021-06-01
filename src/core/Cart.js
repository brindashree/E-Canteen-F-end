import React, { useState, useEffect } from "react";
import "../styles.css";

import Base from "./Base";

import {
	findAndUpdate,
	loadCart,
	removeItemFromCart,
} from "./helper/carthelper";
import CardForCart from "./CardForCart";
import { addItemToCart } from "./helper/carthelper";

// import Paymentb from "./Paymentb";

const Cart = () => {
	const [products, setProducts] = useState(loadCart());

	// useEffect(() => {
	// 	setProducts(loadCart());
	// }, [products]);
	// const addToCart = (product, i) => {
	// 	addItemToCart(product);
	// 	setProducts((prevState) =>
	// 		prevState.map((item, o) => {
	// 			if (i === o) {
	// 				return {
	// 					...item,
	// 					inCart: true,
	// 					quantity: item.counterVal,
	// 				};
	// 			}
	// 			return item;
	// 		})
	// 	);
	// };
	const increaseQuantity = (prodId) => {
		setProducts((prevCart) =>
			prevCart.map((item) => {
				console.log(item.inCart);
				if (prodId === item._id && item.inCart) {
					if (item.quantity > 9) {
						return item;
					} else {
						return { ...item, quantity: item.quantity + 1 };
					}
				} else if (prodId === item._id) {
					if (item.counterValue > 9) {
						return item;
					} else
						return {
							...item,
							counterValue: item.counterValue + 1,
						};
				}
				return item;
			})
		);
	};
	const decreaseQuantity = (prodId) => {
		setProducts((prevCart) =>
			prevCart.map((item) => {
				if (prodId === item._id && item.inCart) {
					if (item.quantity > 1) {
						return { ...item, quantity: item.quantity - 1 };
					} else {
						return item;
					}
				} else if (prodId === item._id && item.counterValue > 1) {
					return {
						...item,
						counterValue: item.counterValue - 1,
					};
				}
				return item;
			})
		);
	};
	const removeFromCart = (prodId) => {
		setProducts((prevCart) =>
			prevCart.map((item) => {
				if (prodId === item._id) {
					return {
						...item,
						quantity: 0,
						counterValue: 1,
						inCart: false,
					};
				}
				return item;
			})
		);

		setProducts(removeItemFromCart(prodId));
	};
	const cartCountTotal = products.reduce((acc, item) => acc + item.quantity, 0);
	const cartPriceTotal = products.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0
	);
	const cartTotals = () =>
		cartCountTotal === 0 ? (
			<div className="carttotal">Cart is empty</div>
		) : (
			<div className="carttotal">
				<p className="fw-bolder">You have {cartCountTotal} items in cart </p>
				<p className="fw-bolder fs-4">
					Total Price:{" "}
					<span style={{ color: "#ffc857" }}>
						Rs{" "}
						{Number.isInteger(cartPriceTotal)
							? cartPriceTotal
							: cartPriceTotal.toFixed(2)}
					</span>
				</p>
			</div>
		);
	const loadAllProducts = (products) => {
		return (
			<div className="row justify-content-center">
				<div
					className="card col-xl-8 col-10 py-2 px-2 mx-8 my-2"
					style={{ backgroundColor: "#0e7490", color: "white" }}
				>
					<div className="d-flex justify-content-around text-center">
						<div className="col-4 fw-bolder fs-5">Name</div>
						<div className="col-2 fw-bolder fs-5">Price</div>
						<div className="col-2 fw-bolder fs-5">Quantity</div>
						<div className="col-3 fw-bolder fs-5">Item total</div>
						<div className="col-1 fw-bolder fs-5">Delete</div>
					</div>
				</div>
				{products.map((product, index) => (
					<div
						className="card cartcard col-xl-8 col-10 py-2 px-2 mx-8 my-2"
						key={index}
					>
						<div className="d-flex justify-content-around">
							<div className="col-4 text-center">
								<h5 className=" fw-bold mt-3 mb-2">{product.name}</h5>
							</div>
							<div className="col-2 text-center">
								<h5 className="fw-bolder fs-6 mt-3 mb-2">{product.price}</h5>
							</div>
							<div className=" col-2 mt-2 mb-2">
								<div className="row">
									<div className="col-4">
										<button
											className="px-3 incdecbtn"
											onClick={() => decreaseQuantity(product._id)}
										>
											-
										</button>
									</div>

									<div className="col-4 flexdiv">
										<h5 className="fw-bolder fs-6 mt-2">{product.quantity}</h5>
									</div>

									<div className="col-4">
										<button
											className="px-3 incdecbtn"
											onClick={() => increaseQuantity(product._id)}
										>
											+
										</button>
									</div>
								</div>
							</div>
							<div className="col-3 d-flex justify-content-center">
								<h5 className="fw-bolder fs-6 mt-3 mb-2">
									{Number.isInteger(product.quantity * product.price)
										? product.quantity * product.price
										: `${(product.quantity * product.price).toFixed(2)}`}
								</h5>
							</div>

							<div className="col-1">
								<div className="col-12">
									<button
										onClick={() => {
											removeFromCart(product._id);
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
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		);
	};
	const loadCheckout = () => {
		return (
			<div>
				<h2>This section for checkout</h2>
			</div>
		);
	};

	return (
		<Base>
			<div style={{ minHeight: "65vh" }}>
				{products && products.length > 0 ? loadAllProducts(products) : null}
				<div className="flexdiv">{cartTotals()}</div>
			</div>
		</Base>
	);
};

export default Cart;
