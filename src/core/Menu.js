import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper";
import "../css/menu.css";

const currentTab = (history, path) => {
	if (history.location.pathname === path) {
		return {
			color: "#ffffff",
			backgroundColor: "#0E7490",

			borderRadius: "7px",
			paddingTop: "10px",
			paddingBottom: "10px",
			paddingLeft: "15px",
			paddingRight: "15px",
			marginBottom: "10px",
		};
	} else {
		return { color: "#084c61" };
	}
};

const Menu = ({ history }) => {
	return (
		<div>
			<div>
				<header className="header">
					<Link className="logo ps-5 fw-bolder" to="/">
						RelishBay
					</Link>
					<input className="menu-btn" type="checkbox" id="menu-btn" />
					<label className="menu-icon" htmlFor="menu-btn">
						<span className="navicon"></span>
					</label>
					<ul className="menu">
						<li>
							<Link
								className="link link-theme link-arrow "
								aria-current="page"
								to="/"
								style={currentTab(history, "/")}
							>
								Home
							</Link>
						</li>

						{isAuthenticated() &&
							(isAuthenticated().user.role === 0 ||
								isAuthenticated().user.role === 1) && (
								<Fragment>
									<li>
										<Link
											style={currentTab(history, "/cart")}
											className="link link-theme link-arrow "
											to="/cart"
										>
											Cart
										</Link>
									</li>
									<li>
										<Link
											style={currentTab(history, "/user/dashboard")}
											className="link link-theme link-arrow "
											to="/user/dashboard"
										>
											U.Dashboard
										</Link>
									</li>
								</Fragment>
							)}
						{isAuthenticated() && isAuthenticated().user.role === 2 && (
							<li>
								<Link
									style={currentTab(history, "/admin/dashboard")}
									className="link link-theme link-arrow"
									to="/admin/dashboard"
								>
									A.Dashboard
								</Link>
							</li>
						)}

						{!isAuthenticated() && (
							<Fragment>
								<li>
									<Link
										style={currentTab(history, "/signin")}
										className="link link-theme link-arrow"
										to="/signin"
									>
										Sign In
									</Link>
								</li>
								<li>
									<Link
										style={currentTab(history, "/signup")}
										className="link link-theme link-arrow"
										to="/signup"
									>
										Signup
									</Link>
								</li>
							</Fragment>
						)}
						{isAuthenticated() && (
							<li>
								<span
									className="link link-theme link-arrow text-white"
									style={{
										backgroundColor: "#ffc857",
										color: "#ffffff",
										padding: "7px",
										borderRadius: "7px",
										marginTop: "10px",
										marginLeft: "15px",
									}}
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
				</header>
			</div>
		</div>
	);
};

export default withRouter(Menu);
