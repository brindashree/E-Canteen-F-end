import { useEffect } from "react";
import { useState } from "react";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import {
	getAllOrders,
	updateConfirmOrder,
	updateDeclineOrder,
} from "./helper/adminapicall";

const ManageOrders = () => {
	const [orders, setOrders] = useState([]);

	const { user, token } = isAuthenticated();
	var or;
	var scolor;
	const td = new Date();
	const tryd = td.toISOString().slice(0, 10);

	const tdate = tryd.split("-").reverse().join("-"); //27-06-2021 -final

	const preload = () => {
		getAllOrders(user._id, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setOrders(data);
			}
		});
	};

	const setcolor = (str) => {
		if (str == "Declined") {
			scolor = "red";
		} else if (str == "Processing") {
			scolor = "#FBBF24";
		} else if (str == "Confirmed") {
			scolor = "#2DD4BF";
		} else if (str == "Cancelled") {
			scolor = "#F87171";
		}
	};
	const confirmOrder = (orderId) => {
		updateConfirmOrder(orderId, user._id, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				preload();
			}
		});
	};
	const declineOrder = (orderId) => {
		updateDeclineOrder(orderId, user._id, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				preload();
			}
		});
	};
	var c = 0;

	useEffect(() => {
		preload();
	}, []);
	return (
		<Base>
			<div
				className="row"
				style={{ minHeight: "65vh", backgroundColor: " #fffbeb" }}
			>
				<div className="col-12">
					<div className="card mx-5 my-5">
						<div className="card-header fw-bold fs-4 text-center">Orders</div>
						<div className="card-header">
							<div className=" row fw-bold fs-6 text-center">
								<div className="col-1">Sl.No</div>
								<div className="col-1">Date</div>
								<div className="col-4">Order</div>
								<div className="col-3">User Details</div>

								<div className="col-1">Status</div>
								<div className="col-2">Action</div>
							</div>
						</div>
						<div className="card-body">
							<table className="list-group list-group-flush text-center fw-bold table table-striped table-bordered">
								<tbody>
									{orders &&
										orders.reverse().map((order, index) => {
											var d = order.createdAt.slice(0, 10);
											var nd = d.split("-").reverse().join("-");

											// or = order.status;

											return (
												<>
													{nd === tdate && order.status !== "Cancelled" ? (
														<tr className=" row  " key={index}>
															<td className="col-1 text-left align-middle">
																{(c = c + 1)}
															</td>
															<td className="col-1">
																<p className=" text-left align-middle">{nd}</p>
															</td>
															<td className="col-4">
																<div>
																	{order.products.map((prod, i) => {
																		return (
																			<span key={i}>
																				{prod.name}({prod.quantity}),{" "}
																			</span>
																		);
																	})}
																</div>
															</td>
															<td className="col-3 d-flex justify-content-around">
																<span>{order.user.name}</span>
																<span>{order.address}</span>
																<span>{order.deliveryTime}</span>
															</td>

															<td className="col-1 text-white">
																{setcolor(order.status)}
																<p
																	className=" text-left align-middle "
																	style={{ backgroundColor: `${scolor}` }}
																>
																	{order.status}
																</p>
															</td>
															<td className="col-1">
																<button
																	className="btn"
																	onClick={() => {
																		confirmOrder(order._id);
																	}}
																>
																	<span>
																		<svg
																			xmlns="http://www.w3.org/2000/svg"
																			width="26"
																			height="26"
																			fill="green"
																			className="bi bi-check-lg"
																			viewBox="0 0 16 16"
																		>
																			<path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z" />
																		</svg>
																	</span>
																</button>
															</td>
															<td className="col-1">
																<button
																	className="btn"
																	onClick={() => {
																		declineOrder(order._id);
																	}}
																>
																	<span>
																		<svg
																			xmlns="http://www.w3.org/2000/svg"
																			width="26"
																			height="26"
																			fill="red"
																			className="bi bi-x-lg"
																			viewBox="0 0 16 16"
																		>
																			<path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z" />
																		</svg>
																	</span>
																</button>
															</td>
														</tr>
													) : null}
												</>
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

export default ManageOrders;
