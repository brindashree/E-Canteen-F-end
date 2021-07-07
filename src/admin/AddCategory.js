import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
	const [name, setName] = useState("");
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);

	const { user, token } = isAuthenticated();

	const goBack = () => (
		<div className="mt-5">
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

	const handleChange = (event) => {
		setError("");
		setName(event.target.value);
	};
	const onSubmit = (event) => {
		event.preventDefault();
		setError("");
		setSuccess(false);

		createCategory(user._id, token, { name }).then((data) => {
			if (data.error) {
				setError(true);
			} else {
				setError("");
				setSuccess(true);
				setName("");
			}
		});
	};

	const successMessage = () => {
		if (success) {
			return <h4 className="text-success">Category created successfully</h4>;
		}
	};
	const warningMessage = () => {
		if (error) {
			return <h4 className="text-success">Failed to create category</h4>;
		}
	};

	const myCategoryForm = () => (
		<form className="flexdiv">
			<div className="form-group adminaddcard py-4 px-4 col-6">
				<h4 className="text-center"> Add category</h4>
				<input
					type="text"
					className="form-control my-3"
					onChange={handleChange}
					value={name}
					autoFocus
					required
					placeholder="For Ex. Snacks"
				/>
				<div className="flexdiv">
					<button
						className="btn fw-bolder signinbtn mb-3 mt-2"
						onClick={onSubmit}
					>
						Create Category
					</button>
				</div>
			</div>
		</form>
	);

	return (
		<Base className="container bg-info p-4">
			<div
				className="row rounded "
				style={{ minHeight: "65vh", backgroundColor: " #fffbeb" }}
			>
				<div className="col-md-8 offset-md-2">
					{goBack()}
					{successMessage()}
					{warningMessage()}
					{myCategoryForm()}
				</div>
			</div>
		</Base>
	);
};
export default AddCategory;
