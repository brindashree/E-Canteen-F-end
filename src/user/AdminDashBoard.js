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
			<div className="card mt-4 mx-3">
				<h4 className="card-header bg-dark text-white">Admin navigation</h4>
				<ul className="list-group">
					<li className="list-group-item">
						<Link to="/admin/create/category" className="nav-link text-success">
							Create Categories
						</Link>
					</li>
					<li className="list-group-item">
						<Link to="/admin/categories" className="nav-link text-success">
							Manage Categories
						</Link>
					</li>
					<li className="list-group-item">
						<Link to="/admin/create/product" className="nav-link text-success">
							Create Product
						</Link>
					</li>
					<li className="list-group-item">
						<Link to="/admin/products" className="nav-link text-success">
							Manage Products
						</Link>
					</li>
					<li className="list-group-item">
						<Link to="/admin/orders" className="nav-link text-success">
							Manage Orders
						</Link>
					</li>
					<li className="list-group-item">
						<Link to="/admin/users" className="nav-link text-success">
							Manage Users
						</Link>
					</li>
				</ul>
			</div>
		);
	};
	const adminRightSide = () => {
		return (
			<div className="card mb-4 mt-4">
				<h4 className="card-header">Admin Info</h4>
				<ul className="list-group">
					<li className="list-group-item">
						<span className="badge bg-success mr-3">Name:</span> {name}
					</li>
					<li className="list-group-item">
						<span className="badge bg-success mr-3">Email:</span> {email}
					</li>
					<li className="list-group-item">
						<span className="badge bg-danger">Admin Area</span>
					</li>
				</ul>
			</div>
		);
	};
	return (
		<Base>
			<div className="row" style={{ minHeight: "65vh" }}>
				<div className="col-xl-3 col-12">{adminLeftSide()}</div>
				<div className="col-xl-6 col-12">{adminRightSide()}</div>
			</div>
		</Base>
	);
};

export default AdminDashBoard;
