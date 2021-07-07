import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { deleteProduct, getProducts } from "./helper/adminapicall";

const ManageProducts = () => {
	const [products, setProducts] = useState([]);

	const { user, token } = isAuthenticated();
	const preload = () => {
		getProducts().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setProducts(data);
			}
		});
	};

	useEffect(() => {
		preload();
	}, []);

	const deleteThisProduct = (productId) => {
		deleteProduct(productId, user._id, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				preload();
			}
		});
	};
	const goBack = () => (
		<div className="px-3 py-3">
			<Link className="btn btn-sm  mb-3" to="/admin/dashboard">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="32"
					height="32"
					fill="black"
					className="bi bi-arrow-left-circle-fill"
					viewBox="0 0 16 16"
				>
					<path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
				</svg>
			</Link>
		</div>
	);

	return (
		<Base>
			<div className="container-fluid" style={{ backgroundColor: " #fffbeb" }}>
				{goBack()}

				<div className="row d-flex justify-content-center">
					<div className=" card adminmanagecard col-10 mb-5">
						<h2 className="text-center my-3 fw-bold">
							Total {products.length} products
						</h2>
						<div className="card-body">
							<ul class="list-group list-group-flush">
								{products.map((product, index) => {
									return (
										<li class="list-group-item">
											<div key={index} className="row text-center mb-1 ">
												<div className="col-4">
													<h5 className=" text-left fw-bold">{product.name}</h5>
												</div>
												<div className="col-8 d-flex justify-content-end">
													<div className="col-4">
														<Link
															className="btn"
															to={`/admin/product/update/${product._id}`}
														>
															<span className="px-5">
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	width="26"
																	height="26"
																	fill="#084c61"
																	className="bi bi-pencil-square"
																	viewBox="0 0 16 16"
																>
																	<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
																	<path
																		fillRule="evenodd"
																		d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
																	/>
																</svg>
															</span>
														</Link>

														<button
															onClick={() => {
																deleteThisProduct(product._id);
															}}
															className="btn "
														>
															<span>
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	width="26"
																	height="26"
																	fill="red"
																	className="bi bi-trash-fill"
																	viewBox="0 0 16 16"
																>
																	<path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
																</svg>
															</span>
														</button>
													</div>
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

export default ManageProducts;
