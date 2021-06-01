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

	return (
		<Base>
			<h2 className="mb-4 d-flex justify-content-center fw-bold">
				All products:
			</h2>

			<div className="row d-flex justify-content-center">
				<div className=" card col-10 mb-5">
					<h2 className="text-center my-3">Total {products.length} products</h2>
					<div className="card-body">
						<ul class="list-group list-group-flush">
							{products.map((product, index) => {
								return (
									<li class="list-group-item">
										<div key={index} className="row text-center mb-1 ">
											<div className="col-4">
												<h5 className=" text-left fw-bold">{product.name}</h5>
											</div>
											<div className="col-4">
												<Link
													className="btn btn-success"
													to={`/admin/product/update/${product._id}`}
												>
													<span className="">Update</span>
												</Link>
											</div>
											<div className="col-4">
												<button
													onClick={() => {
														deleteThisProduct(product._id);
													}}
													className="btn btn-danger"
												>
													Delete
												</button>
											</div>
										</div>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			</div>
		</Base>
	);
};

export default ManageProducts;
