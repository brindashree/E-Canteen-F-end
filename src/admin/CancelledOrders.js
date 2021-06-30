import { useEffect } from "react";
import { useState } from "react";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import {
	getAllOrders,
	updateConfirmOrder,
	updateDeclineOrder,
} from "./helper/adminapicall";

const CancelledOrders = () => {
	const [orders, setOrders] = useState([]);
	const td = new Date();
	const tryd = td.toISOString().slice(0, 10);

	const tdate = tryd.split("-").reverse().join("-"); //27-06-2021 -final

	const { user, token } = isAuthenticated();

	const preload = () => {
		getAllOrders(user._id, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setOrders(data);
			}
		});
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
	var scolor;
	const setcolor = (str) => {
		if (str == "Declined") {
			scolor = "red";
		} else if (str == "Processing" || str == "Yet to Pay") {
			scolor = "#FBBF24";
		} else if (str == "Confirmed" || str == "Paid") {
			scolor = "#2DD4BF";
		} else if (str == "Cancelled") {
			scolor = "#F87171";
		}
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
								<div className="col-3">Order</div>
								<div className="col-3">User Details</div>
								<div className="col-1">Order Status</div>
								<div className="col-3">Payment Status</div>
							</div>
						</div>
						<div className="card-body">
							<table className="list-group list-group-flush text-center fw-bold table table-striped table-bordered">
								<tbody>
									{orders &&
										orders.reverse().map((order, index) => {
											var d = order.createdAt.slice(0, 10);
											var nd = d.split("-").reverse().join("-");
											console.log(nd);

											return (
												<>
													{nd === tdate && order.status === "Cancelled" ? (
														<tr className=" row  " key={index}>
															<td className="col-1 text-left align-middle">
																{(c = c + 1)}
															</td>
															<td className="col-1">
																<p className=" text-left align-middle">{nd}</p>
															</td>
															<td className="col-3">
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

															<td className="col-1 d-flex justify-content-around text-white fw-bold">
																{setcolor(order.status)}
																<p
																	className=" p-2 rounded-2"
																	style={{ backgroundColor: `${scolor}` }}
																>
																	{order.status}
																</p>
															</td>
															<td className="col-3  text-white fw-bold">
																{setcolor(
																	order.paid == true ? "Paid" : "Yet to Pay"
																)}
																<div className="d-flex justify-content-around ">
																	<p
																		className=" p-2 rounded-2"
																		style={{ backgroundColor: `${scolor}` }}
																	>
																		{order.paid == true ? "Paid" : "Yet to Pay"}
																	</p>
																	{order.paid == true && (
																		<p className="text-dark">
																			<svg
																				xmlns="http://www.w3.org/2000/svg"
																				width="26"
																				height="26"
																				fill="red"
																				className="bi bi-tags-fill"
																				viewBox="0 0 16 16"
																			>
																				<path d="M2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2zm3.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
																				<path d="M1.293 7.793A1 1 0 0 1 1 7.086V2a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l.043-.043-7.457-7.457z" />
																			</svg>
																			Refund Requested
																		</p>
																	)}
																</div>
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

export default CancelledOrders;
