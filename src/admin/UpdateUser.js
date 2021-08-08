import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getRbUser, updateRbUser } from "./helper/adminapicall";

const UpdateUser = ({ match }) => {
	const { user, token } = isAuthenticated();

	const [values, setValues] = useState({
		name: "",
		email: "",
		role: "",

		loading: false,
		error: "",
		createdProduct: "",
		getaRedirect: false,
		formData: "",
	});
	const {
		name,
		email,
		role,

		error,
		createdProduct,

		formData,
	} = values;

	const preload = (rbuserId) => {
		getRbUser(rbuserId).then((data) => {
			console.log(data);
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setValues({
					...values,
					name: data.name,
					email: data.email,
					role: data.role,

					formData: new FormData(),
				});
			}
		});
	};

	// const preloadCategories = () => {
	// 	return getCategories().then((data) => {
	// 		if (data.error) {
	// 			setValues({ ...values, error: data.error });
	// 		} else {
	// 			setValues({
	// 				categories: data,
	// 				formData: new FormData(),
	// 			});
	// 		}
	// 	});
	// };

	const handleChange = (name) => (event) => {
		const value = name === "photo" ? event.target.files[0] : event.target.value;
		formData.set(name, value);
		setValues({ ...values, [name]: value });
	};

	const successMessage = () => {
		return (
			<div
				className="alert alert-success mt-3"
				style={{ display: createdProduct ? "" : "none" }}
			>
				<h4>{createdProduct} updated successfully</h4>
			</div>
		);
	};

	const errorMessage = () => {
		if (error) {
			return (
				<div
					className="alert alert-danger mt-3"
					style={{ display: createdProduct ? "" : "none" }}
				>
					<h4>{createdProduct} error in updating user</h4>
				</div>
			);
		}
	};
	useEffect(() => {
		preload(match.params.rbuserId);
	}, []);

	const onSubmit = (event) => {
		event.preventDefault();
		setValues({ ...values, error: "", loading: true });
		console.log(values);
		updateRbUser(match.params.rbuserId, user._id, token, formData).then(
			(data) => {
				if (data.error) {
					setValues({ ...values, error: data.error });
				} else {
					setValues({
						...values,
						name: "",
						email: "",
						role: "",

						loading: false,
						createdProduct: data.name,
					});
				}
			}
		);
	};
	const createProductForm = () => (
		<form>
			<div className="form-group m-2">
				<input
					onChange={handleChange("name")}
					name="photo"
					className="form-control"
					placeholder="Name"
					value={name}
				/>
			</div>
			<div className="form-group m-2">
				<textarea
					onChange={handleChange("email")}
					name="photo"
					className="form-control"
					placeholder="email"
					value={email}
				/>
			</div>
			<div className="form-group m-2">
				<input
					onChange={handleChange("role")}
					type="number"
					className="form-control"
					placeholder="Role"
					value={role}
				/>
			</div>

			<button
				type="submit"
				onClick={onSubmit}
				className="btn btn-outline-success mb-3"
			>
				Update User
			</button>
		</form>
	);
	return (
		<Base className="container bg-info p-4">
			<div style={{ minHeight: "65vh", backgroundColor: " #fffbeb" }}>
				<Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3 ">
					Admin Home
				</Link>
				<div className="row bg-dark text-white rounded">
					<div className="col-md-8 offset-md-2">
						<h1>
							{successMessage()}
							{errorMessage()}
							{createProductForm()}
						</h1>
					</div>
				</div>
			</div>
		</Base>
	);
};

export default UpdateUser;
