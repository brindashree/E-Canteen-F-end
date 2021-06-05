import React from "react";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { Link } from "react-router-dom";

const AdminDashBoard = () => {
	const {
		user: { name, email },
	} = isAuthenticated();
	const adminLeftSide = () => {
		return (
			<div className=" signin card mt-4 mx-3 text-center">
				<h4 className="card-header fw-bold">Admin navigation</h4>
				<div className="row mx-2">
					<div className="col-3 adminlist">
						<h5 className="py-2">Categories</h5>
						<ul className="list-group">
							<li className="list-group-item mb-2">
								<Link
									to="/admin/create/category"
									className="nav-link adminlistcolor"
								>
									Create Categories
								</Link>
							</li>
							<li className="list-group-item mb-2">
								<Link
									to="/admin/categories"
									className="nav-link adminlistcolor "
								>
									Manage Categories
								</Link>
							</li>
						</ul>
					</div>
					<div className="col-3 adminlist">
						<h5 className="py-2">Products</h5>
						<ul className="list-group">
							<li className="list-group-item mb-2">
								<Link
									to="/admin/create/product"
									className="nav-link adminlistcolor"
								>
									Create Product
								</Link>
							</li>
							<li className="list-group-item mb-2">
								<Link to="/admin/products" className="nav-link adminlistcolor">
									Manage Products
								</Link>
							</li>
						</ul>
					</div>
					<div className="col-3 adminlist">
						<h5 className="py-2">Users</h5>
						<ul className="list-group">
							<li className="list-group-item mb-2">
								<Link to="/admin/users" className="nav-link adminlistcolor">
									Manage Users
								</Link>
							</li>
						</ul>
					</div>
					<div className="col-3 adminlist">
						<h5 className="py-2">Orders</h5>
						<ul className="list-group">
							<li className="list-group-item mb-2">
								<Link to="/admin/orders" className="nav-link adminlistcolor">
									Manage Orders
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		);
	};
	const adminRightSide = () => {
		return (
			<div className=" signin card mb-4 mt-4 me-2 ">
				<h4 className="card-header">Admin Info</h4>
				<ul className="list-group">
					<li className="list-group-item">
						<span className="badge bg-success mr-3">Name:</span> {name}
					</li>
					<li className="list-group-item">
						<span className="badge bg-success mr-3">Email:</span> {email}
					</li>
				</ul>
			</div>
		);
	};
	return (
		<Base>
			<div className="row" style={{ minHeight: "65vh" }}>
				<div className="col-xl-9 col-12 ">{adminLeftSide()}</div>
				<div className="col-xl-3 col-12">{adminRightSide()}</div>
			</div>
		</Base>
	);
};

export default AdminDashBoard;
