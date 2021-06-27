import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Base from "./Base";
import { Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth/helper";
import { loadCart, removeItemFromCart } from "./helper/carthelper";
import StripeCheckout from "react-stripe-checkout";
import { API } from "../backend";
import { createOrder } from "../core/helper/orderhelper";

const TotalPay = (props) => {
	const price = props.cartPriceTotal;
	const count = props.cartCountTotal;

	const [items, setItems] = useState(loadCart());

	const [values, setValues] = useState({
		email: "poojang@gmail.com",
		phone: "123456",
		error: "",
		time: " ",
		loading: false,
		didRedirect: false,
		address: " ",
	});

	const { email, phone, error, loading, didRedirect, time, address } = values;

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
				<div className="signin card col-12 col-xl-6 mt-5">
					<div className="card-header">
						<h2 className="text-center fw-bolder">Checkout</h2>
					</div>
					<div className="d-flex justify-content-around mt-3 mb-3 ">
						<h5 className="fw-bolder">Total Items : {count} </h5>
						<h5 className="fw-bolder">Total Price : {price}</h5>
					</div>
					<div className="flexdiv">
						<div className="col-4 mb-3">
							<select
								className="form-select btn btn-secondary"
								aria-label="Default select example"
							>
								<option value="0">Cart Items</option>
								{items &&
									items.map((item, i) => {
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
									<span className="input-group-text fw-bold fs-6">Email</span>
									<input
										value={email}
										onChange={handleChange("email")}
										className="form-control fw-bold fs-6"
										type="email"
									/>
								</div>

								<div className="input-group mb-3">
									<span className="input-group-text fw-bold fs-6">Phone</span>
									<input
										value={phone}
										onChange={handleChange("phone")}
										className="form-control fw-bold fs-6"
										type="number"
									/>
								</div>
								<div className="input-group mb-3">
									<span className="input-group-text fw-bold fs-6">Timings</span>
									<input
										value={time}
										onChange={handleChange("time")}
										className="form-control fw-bold fs-6"
										type="time"
									/>
								</div>
								{isAuthenticated() && isAuthenticated().user.role === 1 && (
									<div className="input-group mb-3">
										<span className="input-group-text fw-bold fs-6">
											Address
										</span>
										<textarea
											value={address}
											onChange={handleChange("address")}
											className="form-control fw-bold fs-6"
											type="text"
										/>
									</div>
								)}
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div
			className="container-fluid"
			style={{ minHeight: "65vh", backgroundColor: " #fffbeb" }}
		>
			{loadingMessage()}
			{errorMessage()}
			{CheckoutForm()}
		</div>
	);
};
export default TotalPay;
