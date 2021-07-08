import { useEffect } from "react";
import { useState } from "react";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getAllOrders } from "./helper/adminapicall";

const AllOrders = () => {
	const [orders, setOrders] = useState([]);
	const [sorders, setSorders] = useState(orders);
	const [searchText, setsearchText] = useState("");
	const [displayOrders, setdisOrders] = useState(true);
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
	var scolor;
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

	useEffect(() => {
		preload();
	}, []);
	const handleOnSubmit = (e) => {
		e.preventDefault();
		if (searchText) {
			searchOrder(searchText);
			setsearchText("");
		}
	};

	const handleOnChange = (e) => {
		setsearchText(e.target.value);
	};

	const searchOrder = (searchText) => {
		var newarr = orders.filter(
			(order) =>
				order.user.name.toLowerCase().includes(searchText.toLowerCase()) ||
				order.status.toLowerCase().includes(searchText.toLowerCase())
		);
		console.log(newarr);
		setSorders(newarr);
		setdisOrders(false);
	};
	return (
		<Base>
			<div
				className="row"
				style={{ minHeight: "65vh", backgroundColor: " #fffbeb" }}
			>
				<div className="flexdiv">
					<div className="card col-6 mt-2">
						<form className="card-body" onSubmit={handleOnSubmit}>
							<div className="input-group">
								<span className="input-group-text fw-bolder">Search</span>
								<input
									className="form-control fw-bolder text-dark"
									type="text"
									value={searchText}
									onChange={handleOnChange}
								/>
							</div>
						</form>
					</div>
				</div>
				<div className="col-12">
					<div className="card mx-5 my-5">
						<div className="card-header fw-bold fs-4 text-center">Orders</div>
						<div className="card-header">
							<div className=" row fw-bold fs-6 text-center">
								<div className="col-1">Sl.No</div>
								<div className="col-1">Date</div>
								<div className="col-4">Order</div>
								<div className="col-3">User Details</div>

								<div className="col-3">Status</div>
							</div>
						</div>
						<div className="card-body">
							<table className="list-group list-group-flush text-center fw-bold table table-striped table-bordered">
								<tbody>
									{displayOrders &&
										orders &&
										orders.reverse().map((order, index) => {
											var d = order.createdAt.slice(0, 10);
											var nd = d.split("-").reverse().join("-");

											return (
												<tr className=" row  " key={index}>
													<td className="col-1 text-left align-middle">
														{index + 1}
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

													<td className="col-3 d-flex justify-content-around text-white fw-bold">
														{setcolor(order.status)}
														<p
															className=" p-2 rounded-2"
															style={{ backgroundColor: `${scolor}` }}
														>
															{order.status}
														</p>
													</td>
												</tr>
											);
										})}

									{sorders &&
										sorders.reverse().map((order, index) => {
											var d = order.createdAt.slice(0, 10);
											var nd = d.split("-").reverse().join("-");

											return (
												<tr className=" row  " key={index}>
													<td className="col-1 text-left align-middle">
														{index + 1}
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

													<td className="col-3 d-flex justify-content-around text-white fw-bold">
														{setcolor(order.status)}
														<p
															className=" p-2 rounded-2"
															style={{ backgroundColor: `${scolor}` }}
														>
															{order.status}
														</p>
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

export default AllOrders;
