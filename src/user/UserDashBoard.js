import React, { useState } from "react";
import { useEffect } from "react";
import { getAllOrders } from "../admin/helper/adminapicall";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";

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
						<div className="card-body">
							<div className="row fw-bold fs-4 text-center">
								<div className="col-2">Date</div>
								<div className="col-6">Order</div>
								<div className="col-2">Total</div>
								<div className="col-2">Status</div>
							</div>
							<ul className="list-group list-group-flush text-center">
								{orders &&
									orders.reverse().map((order, index) => {
										var d = order.createdAt.slice(0, 10);

										return (
											<li className="list-group-item" key={index}>
												<div className="row ">
													<div className="col-2">
														<p className=" text-left fs-5 fw-bold align-middle">
															{d}
														</p>
													</div>
													<div className="col-6">
														<div className="card">
															<ul className="list-group list-group-flush">
																{order.products.map((prod, i) => {
																	return (
																		<li className="list-group-item" key={i}>
																			<div className="row">
																				<span className="col-4">
																					{prod.name}
																				</span>
																				<span className="col-4">
																					{prod.price}
																				</span>
																				<span className="col-4">
																					{prod.quantity}
																				</span>
																			</div>
																		</li>
																	);
																})}
															</ul>
														</div>
													</div>
													<div className="col-2">
														<p className=" text-left fw-bold fs-5 align-middle">
															{order.amount}
														</p>
													</div>
													<div className="col-2">
														<p className=" text-left fw-bold fs-5 align-middle">
															{order.status}
														</p>
													</div>
												</div>
											</li>
										);
									})}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</Base>
	);
};

export default UserDashBoard;
