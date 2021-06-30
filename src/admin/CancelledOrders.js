import { useEffect } from "react";
import { useState } from "react";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getAllOrders, updateRefundStatus } from "./helper/adminapicall";
import emailjs from "emailjs-com";

const CancelledOrders = () => {
	const [orders, setOrders] = useState([]);
	const [approveBtn, setapproveBtn] = useState(true);
	const td = new Date();
	const tryd = td.toISOString().slice(0, 10);

	const tdate = tryd.split("-").reverse().join("-"); //27-06-2021 -final

	const { user, token } = isAuthenticated();

	const preload = () => {
		getAllOrders(user._id, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setOrders(data.reverse());
			}
		});
	};
	const RefundOrder = (orderId) => {
		updateRefundStatus(orderId, user._id, token).then((data) => {
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
	let username;
	let useremail;
	let useramount;

	const sendEmail = () => {
		const mailData = {
			subject: "Refund Initiated",
			message:
				"Your amount of Rs " +
				useramount +
				" will be refunded in 7 working days",
			m_username: username,
			m_useremail: useremail,
		};
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
					setapproveBtn(false);
				},
				function (error) {
					console.log("FAILED...", error);
				}
			);
	};

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
										orders.map((order, index) => {
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
																<div>
																	<p
																		className=" p-2 rounded-2"
																		style={{ backgroundColor: `${scolor}` }}
																	>
																		{order.status}
																	</p>
																</div>
															</td>
															<td className="col-3  text-white fw-bold">
																{setcolor(
																	order.paid == true ? "Paid" : "Yet to Pay"
																)}
																<div className="d-flex justify-content-around ">
																	<div>
																		<p
																			className=" p-2 rounded-2"
																			style={{ backgroundColor: `${scolor}` }}
																		>
																			{order.paid == true
																				? "Paid "
																				: "Yet to Pay "}
																			Rs.{order.amount}
																		</p>
																	</div>
																	{order.paid == true && (
																		<p className="text-dark">
																			<div>
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
																				{!order.refundApproval
																					? "Refund Requested"
																					: "You have Approved Refund"}
																			</div>
																			{!order.refundApproval && (
																				<button
																					onClick={() => {
																						username = order.user.name;
																						useremail = order.user.email;
																						useramount = order.amount;
																						sendEmail();
																						RefundOrder(order._id);
																					}}
																					className="btn btn-info text-dark fw-bold rounded-2"
																				>
																					Approve
																				</button>
																			)}
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
