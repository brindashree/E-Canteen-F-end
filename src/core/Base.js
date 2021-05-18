import React from "react";
import CategoryPanel from "./CategoryPanel.js";
import Menu from "./Menu.js";

const Base = ({
	title = "My title",
	description = "My description",
	classname = "bg-dark text-white p-4",
	children,
}) => {
	return (
		<div>
			<Menu />

			<span>{children}</span>

			<footer className="footer bg-dark mt-auto py-3">
				<div className="container-fluid bg-success text-white text-center py-3">
					<h4>If you got any questions, feel free to reach out!</h4>
					<button className="btn btn-warning btn-lg">Contact Us</button>
				</div>
				<div className="container">
					<span className="text-muted">
						An <span className="text-white">amazing place</span> to buy T Shirts
					</span>
				</div>
			</footer>
		</div>
	);
};

export default Base;
