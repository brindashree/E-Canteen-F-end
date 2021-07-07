import React, { useState, useEffect } from "react";
import "../styles.css";

import Base from "./Base";

import { cartEmpty, loadCart, removeItemFromCart } from "./helper/carthelper";

import StripeCheckout from "react-stripe-checkout";

import { API } from "../backend";
import { createOrder } from "./helper/orderhelper";
import { isAuthenticated } from "../auth/helper";
import { Redirect } from "react-router-dom";

const Cart = () => {
	const [products, setProducts] = useState(loadCart());
	const useremail = isAuthenticated().user.email;
	const tokenId = isAuthenticated() && isAuthenticated().token;
	const userId = isAuthenticated() && isAuthenticated().user._id;
	const [redirect, setRedirect] = useState(false);
	const [Dredirect, setDRedirect] = useState(false);
	var msg;

	const createOrderByUser = () => {
		const price = cartPriceTotal;
		const orderData = {
			products: products,
			transaction_id: tokenId,
			amount: price,
			address: address,
			deliveryTime: time,
		};
		if (price > 0) {
			createOrder(userId, tokenId, orderData);
			alert("You will get a MAIL after the order is Confirmed");
			cartEmpty(() => {
				console.log("cart empty");
				setDRedirect(true);
				// setRedirect(true);
			});
		} else {
			alert("Cannot place order");
		}
	};
	const getARedirectDashboard = (Dredirect) => {
		if (Dredirect) {
			return <Redirect to="/user/dashboard" />;
		}
	};

	const getARedirect = (redirect) => {
		if (redirect) {
			return <Redirect to="/" />;
		}
	};
	const increaseQuantity = (prodId) => {
		setProducts((prevCart) =>
			prevCart.map((item) => {
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
	const cartTotals = (str) => {
		return (
			<div className="row">
				<div className="col-md-6 offset-sm-3 text-left">
					<div className="alert alert-danger fw-bold text-center fs-4">
						{str}
					</div>
				</div>
			</div>
		);
	};
	const loadAllProducts = (products) => {
		return (
			<div className="row justify-content-center">
				<div
					className="card col-xl-8 col-11 py-2 px-2 mx-8 my-2"
					style={{ backgroundColor: "#0e7490", color: "white" }}
				>
					<div className="d-flex justify-content-around text-center">
						<div className="col-2 col-xl-4 fw-bolder">Name</div>
						<div className="col-2 col-xl-2 fw-bolder">Price</div>
						<div className="col-3 col-xl-2 fw-bolder">Quantity</div>
						<div className="col-3 col-xl-3 fw-bolder">Item total</div>
						<div className="col-2 col-xl-1 fw-bolder">Delete</div>
					</div>
				</div>
				{products.map((product, index) => (
					<div
						className="card cartcard col-xl-8 col-11 py-2 px-2 mx-8 my-2"
						key={index}
					>
						<div className="d-flex justify-content-around">
							<div className="col-2 col-xl-4 text-center">
								<h6 className=" fw-bold mt-3 mb-2">{product.name}</h6>
							</div>
							<div className="col-2 col-xl-2 text-center">
								<h5 className="fw-bolder fs-6 mt-3 mb-2">{product.price}</h5>
							</div>
							<div className=" col-3 col-xl-2 mt-2 mb-2">
								<div className="row">
									<div className="col-1 col-xl-4">
										<button
											className="px-1 incdecbtn"
											onClick={() => decreaseQuantity(product._id)}
										>
											-
										</button>
									</div>

									<div className="col-1 col-xl-4 text-center">
										<h6 className="fw-bolder mt-2">{product.quantity}</h6>
									</div>

									<div className="col-1 col-xl-4">
										<button
											className="px-1 incdecbtn"
											onClick={() => increaseQuantity(product._id)}
										>
											+
										</button>
									</div>
								</div>
							</div>
							<div className="col-3 col-xl-3 d-flex justify-content-center">
								<h5 className="fw-bolder fs-6 mt-3 mb-2">
									{Number.isInteger(product.quantity * product.price)
										? product.quantity * product.price
										: `${(product.quantity * product.price).toFixed(2)}`}
								</h5>
							</div>

							<div className="col-2 col-xl-1">
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

	//-----------
	const [values, setValues] = useState({
		phone: "",
		error: "",
		time: " ",
		loading: false,
		didRedirect: false,
		address: " ",
	});
	const { phone, error, loading, didRedirect, time, address } = values;
	const handleChange = (name) => (event) => {
		//...values = loads all the existing values
		setValues({ ...values, error: false, [name]: event.target.value });
	};
	const loadingMessage = () => {
		return (
			loading && (
				<div className="alert alert-info">
					<h2>Loading.....</h2>
				</div>
			)
		);
	};

	const errorMessage = () => {
		return (
			<div className="row">
				<div className="col-md-6 offset-sm-3 text-left">
					<div
						className="alert alert-danger"
						style={{ display: error ? "" : "none" }}
					>
						{error}
					</div>
				</div>
			</div>
		);
	};

	const CheckoutForm = () => {
		return (
			<div className="d-flex justify-content-center">
				<div className="signin card col-12 col-xl-6 mt-5 mb-3">
					<div className="card-header">
						<h2 className="text-center fw-bolder">Checkout</h2>
					</div>
					<div className="card-body">
						<div className="d-flex justify-content-around mt-3 mb-3 ">
							<h6 className="fw-bolder">Total Items : {cartCountTotal} </h6>
							<h6 className="fw-bolder">
								Total Price : Rs.
								<span className=" fw-bolder ">{cartPriceTotal}</span>{" "}
							</h6>
						</div>
						<div className="flexdiv">
							<div className="col-4 mb-3">
								<select
									className="form-select btn btn-secondary"
									aria-label="Default select example"
								>
									<option value="0">Cart Items</option>
									{products &&
										products.map((item, i) => {
											return (
												<option value={i} key={i}>
													{item.name}
												</option>
											);
										})}
								</select>
							</div>
						</div>

						<div className="row">
							<div className="col-md-6 offset-sm-3 text-left px-2">
								<form>
									<div className="input-group mb-3">
										<span className="input-group-text fw-bold ">Email</span>
										<input
											value={useremail}
											className="form-control fw-bold"
											type="email"
											disabled
										/>
									</div>

									<div className="input-group mb-3">
										<span className="input-group-text fw-bold ">Phone</span>
										<input
											value={phone}
											onChange={handleChange("phone")}
											className="form-control fw-bold"
											type="number"
											required={true}
										/>
									</div>
									<div className="input-group mb-3">
										<span className="input-group-text fw-bold">Timings</span>
										<input
											value={time}
											onChange={handleChange("time")}
											className="form-control fw-bold"
											type="time"
											required
										/>
									</div>
									{isAuthenticated() && isAuthenticated().user.role === 1 && (
										<div className="input-group mb-3">
											<span className="input-group-text fw-bold ">Address</span>
											<textarea
												value={address}
												onChange={handleChange("address")}
												className="form-control fw-bold"
												type="text"
											/>
										</div>
									)}
									<div className="flexdiv">
										<button
											className="btn fw-bold signinbtn mb-3"
											onClick={createOrderByUser}
										>
											Confirm Order
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	};

	///-------------

	return (
		<Base>
			{getARedirect(redirect)}
			{getARedirectDashboard(Dredirect)}
			<div
				className="container-fluid"
				style={{ minHeight: "65vh", backgroundColor: " #fffbeb" }}
			>
				{products && products.length > 0 ? loadAllProducts(products) : null}
				{cartCountTotal === 0 && cartTotals("Cart Empty")}

				{loadingMessage()}
				{errorMessage()}
				{CheckoutForm()}
			</div>
		</Base>
	);
};

export default Cart;
