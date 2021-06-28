import React, { useState } from "react";
import { useEffect } from "react";
import { getAllOrders } from "../admin/helper/adminapicall";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { cancelOrderByUser } from "./helper/userapicalls";

const UserDashBoard = () => {
	const { user, token } = isAuthenticated();
	const [orders, setOrders] = useState([]);

	const preload = () => {
		getAllOrders(user._id, token).then((data) => {
			console.log(data);
			if (data.error) {
				console.log(data.error);
			} else {
				console.log(data);
				setOrders(data.filter((order) => order.user._id === user._id));
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
						<div className="card-header fw-bold fs-3 text-center">
							Transaction history
						</div>
						<div className="card-header">
							<div className=" row fw-bold fs-6 text-center">
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
										orders.reverse().map((order, index) => {
											var d = order.createdAt.slice(0, 10);

											return (
												<tr className=" row " key={index}>
													<td className="col-1">
														<p className=" text-left  align-middle">
															{index + 1}
														</p>
													</td>
													<td className="col-2">
														<p className=" text-left  align-middle">{d}</p>
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
														<button
															className="btn btn-danger rounded-2 fw-bold text-white"
															onClick={() => {
																cancelOrder(order._id);
															}}
														>
															Cancel Order
														</button>
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
