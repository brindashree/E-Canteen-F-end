import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper";

const currentTab = (history, path) => {
	if (history.location.pathname === path) {
		return { backgroundColor: "#2ecc72", color: "#111827" };
	} else {
		return { color: "#111827" };
	}
};

const Menu = ({ history }) => {
	return (
		<nav className="navbar navbar-expand-lg navdiv">
			<div className="container-fluid">
				<Link className="navbar-brand" to="/">
					LOGO
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div
					className="collapse navbar-collapse d-flex justify-content-end"
					id="navbarSupportedContent"
				>
					<ul className="navbar-nav ">
						<li className="nav-item mx-2 bg-white text-black">
							<Link
								className="nav-link active"
								aria-current="page"
								to="/"
								style={currentTab(history, "/")}
							>
								Home
							</Link>
						</li>
						<li className="nav-item mx-2 bg-white text-black">
							<Link
								style={currentTab(history, "/cart")}
								className="nav-link"
								to="/cart"
							>
								Cart
							</Link>
						</li>

						{isAuthenticated() && isAuthenticated().user.role === 0 && (
							<li className="nav-item mx-2 bg-white text-black">
								<Link
									style={currentTab(history, "/user/dashboard")}
									className="nav-link"
									to="/user/dashboard"
								>
									U.Dashboard
								</Link>
							</li>
						)}
						{isAuthenticated() && isAuthenticated().user.role === 2 && (
							<li className="nav-item mx-2 bg-white text-black">
								<Link
									style={currentTab(history, "/admin/dashboard")}
									className="nav-link"
									to="/admin/dashboard"
								>
									A.Dashboard
								</Link>
							</li>
						)}

						{!isAuthenticated() && (
							<Fragment>
								<li className="nav-item mx-2 bg-white text-black">
									<Link
										style={currentTab(history, "/signin")}
										className="nav-link"
										to="/signin"
									>
										Sign In
									</Link>
								</li>
								<li className="nav-item mx-2 bg-white text-black">
									<Link
										style={currentTab(history, "/signup")}
										className="nav-link"
										to="/signup"
									>
										Signup
									</Link>
								</li>
							</Fragment>
						)}
						{isAuthenticated() && (
							<li className="nav-item mx-2 bg-white text-black ">
								<span
									className="nav-link text-black"
									style={{ backgroundColor: "#ffc857", color: "#111827" }}
									onClick={() => {
										signout(() => {
											history.push("/");
										});
									}}
								>
									Signout
								</span>
							</li>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default withRouter(Menu);
