import React, { useState } from "react";
import { useEffect } from "react";
import emailjs from "emailjs-com";
import { getAllOrders } from "../admin/helper/adminapicall";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { cancelOrderByUser, updatePaymentSuccess } from "./helper/userapicalls";
import StripeCheckout from "react-stripe-checkout";
import { API } from "../backend";

const UserDashBoard = () => {
	const { user, token } = isAuthenticated();

	const [orders, setOrders] = useState([]);
	const [displayButton, setDisplayBtn] = useState(false);
	const [displayPayBtn, setDisplayPayBtn] = useState(true);

	const preload = () => {
		getAllOrders(user._id, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setOrders(
					data.filter((order) => order.user._id === user._id).reverse()
				);
			}
		});
	};
	const cancelOrder = (orderId) => {
		cancelOrderByUser(orderId, user._id, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				preload();
			}
		});
	};
	const td = new Date();
	const tryd = td.toISOString().slice(0, 10);
	let stripeprice;
	let id;
	let m_orderdetails;
	const tdate = tryd.split("-").reverse().join("-");
	var scolor;
	const setcolor = (str) => {
		if (str == "Declined") {
			scolor = "red";
		} else if (str == "Processing") {
			scolor = "#FBBF24";
		} else if (str == "Confirmed") {
			scolor = "#2DD4BF";
		} else if (str == "Cancelled") {
			scolor = "#F59E0B";
		}
	};

	const myfun = () => {
		setDisplayBtn(true);
	};
	setTimeout(myfun, 10000);

	useEffect(() => {
		preload();
	}, []);
	const paymentSuccess = (orderId) => {
		updatePaymentSuccess(orderId, user._id, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				preload();
			}
		});
	};
	const sendConfirmEmail = (mailData) => {
		emailjs
			.send(
				"service_3owpw22",
				"template_a21c4rb",
				mailData,
				"user_N1HQe4z1V8wJifQ44jyRb"
			)
			.then(
				function (response) {
					console.log("SUCCESS!", response.status, response.text);
				},
				function (error) {
					console.log("FAILED...", error);
				}
			);
	};

	//stripe makepayment
	const makepayment = (token) => {
		const price = stripeprice;
		const orderId = id;

		const body = {
			token,

			price,
		};

		const headers = {
			"Content-Type": "application/json",
		};
		return fetch(`${API}stripepayment`, {
			method: "POST",
			headers,
			body: JSON.stringify(body),
		})
			.then((response) => {
				const { status } = response;
				console.log("Payment Status : " + status);

				if (status == 200) {
					setDisplayPayBtn(false);
					paymentSuccess(orderId);
					var str = "<b>Your Order Details :</b>";
					m_orderdetails.products.map((prod) => {
						return (str = str + prod.name + "(" + prod.quantity + ")" + " , ");
					});
					var x = str + "<br/><b>Total Amount :</b>Rs " + price;

					const mailData = {
						subject: "Your payment is successful and order is confirmed.",
						message: x,
						m_username: user.name,
						m_useremail: user.email,
					};

					sendConfirmEmail(mailData);
				}
			})
			.catch((err) => {
				console.log(err);
				const mailData = {
					subject: "Your payment was Unsuccessful.",
					message: "Payment Unsuccessful, try again later.",
					m_username: user.name,
					m_useremail: user.email,
				};

				sendConfirmEmail(mailData);
			});
	};

	return (
		<Base>
			<div
				className="row"
				style={{ minHeight: "65vh", backgroundColor: " #fffbeb" }}
			>
				<div className="col-12 col-xl-12">
					<div className="signin card mx-5 my-3">
						<div className="card-header fw-bold fs-3 text-center">
							Transaction history
						</div>
						<div className="card-header">
							<div className=" row col-12 fw-bold text-center">
								<div className="col-1">Sl.No</div>
								<div className="col-2">Date</div>
								<div className="col-5">Order</div>
								<div className="col-1">Total</div>
								<div className="col-1">Status</div>
								<div className="col-2">Actions</div>
							</div>
						</div>
						<div className="card-body">
							<table className="list-group list-group-flush text-center fw-bold table table-striped table-bordered">
								<tbody>
									{orders &&
										orders.map((order, index) => {
											var d = order.createdAt.slice(0, 10);
											var nd = d.split("-").reverse().join("-");

											return (
												<tr className=" row " key={index}>
													<td className="col-1">
														<p className=" text-left  align-middle">
															{index + 1}
														</p>
													</td>
													<td className="col-2">
														<p className=" text-left  align-middle">{nd}</p>
													</td>
													<td className="col-5">
														<div>
															<div className="card">
																<ul className="list-group list-group-flush">
																	{order.products.map((prod, i) => {
																		return (
																			<li className="list-group-item" key={i}>
																				<div className="row">
																					<span className="col-8">
																						{prod.name}({prod.quantity})
																					</span>
																					<span className="col-4">
																						₹ {prod.price}
																					</span>
																				</div>
																			</li>
																		);
																	})}
																</ul>
															</div>
														</div>
													</td>
													<td className="col-1">
														<p className=" text-left  align-middle">
															₹ {order.amount}
														</p>
													</td>
													<td className="col-1  fw-bold">
														{setcolor(order.status)}
														<p
															className=" text-left  align-middle p-2 rounded-2"
															style={{ color: `${scolor}` }}
														>
															{order.status}
														</p>
													</td>
													<td className="col-2">
														<div className="d-flex justify-content-around">
															{displayButton === false && tdate == nd ? (
																<button
																	className="btn btn-danger rounded-2 fw-bold text-white"
																	onClick={() => {
																		cancelOrder(order._id);
																	}}
																>
																	Cancel
																</button>
															) : order.status === "Confirmed" &&
															  tdate == nd ? (
																<p>Order cannot be cancelled</p>
															) : order.status === "Processing" ? (
																<p>Yet to be Confirmed</p>
															) : null}
															{order.status == "Confirmed" &&
																order.paid == false &&
																tdate == nd &&
																displayPayBtn == true && (
																	<StripeCheckout
																		stripeKey="pk_test_51J0l2NSEF0BipjQawl7LIz1ikT4AlGXdNSZRwa1OkLNKmteI5fziHCBfBjyhhMZtxZ9rjys9mQtcmWMDosQPzNth00nTqeYbgs"
																		token={makepayment}
																		name="Relish Bay"
																		currency="INR"
																		amount={order.amount * 100}
																	>
																		<button
																			onClick={() => {
																				stripeprice = order.amount;
																				id = order._id;
																				m_orderdetails = order;
																			}}
																			className=" btn btn-danger rounded-2 fw-bold text-white"
																		>
																			Pay
																		</button>
																	</StripeCheckout>
																)}
														</div>
													</td>
												</tr>
											);
										})}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</Base>
	);
};

export default UserDashBoard;
