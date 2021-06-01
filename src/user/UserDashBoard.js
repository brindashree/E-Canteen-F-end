import React from "react";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";

const UserDashBoard = () => {
	const {
		user: { name, email },
	} = isAuthenticated();

	return (
		<Base>
			<div className="row" style={{ minHeight: "65vh" }}>
				<div className="col-4">
					<div className="card mx-5 my-5">
						<div className="card-header">Profile</div>
						<div className="card-body">
							<h5 className="mb-4">
								<span className="bg-info p-1 rounded mx-3">Name : </span>
								{name}
							</h5>
							<h5>
								<span className="bg-info p-1 rounded mx-3">Email : </span>
								{email}
							</h5>
						</div>
					</div>
				</div>
				<div className="col-1"></div>
				<div className="col-7">
					<div className="card mx-5 my-5">
						<div className="card-header">Transaction history</div>
						<div className="card-body">
							<div className="row">
								<div className="col-4">Date</div>
								<div className="col-4">order</div>
								<div className="col-4">Total</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Base>
	);
};

export default UserDashBoard;
