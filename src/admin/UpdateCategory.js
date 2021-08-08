import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getCategory, updateCategory } from "./helper/adminapicall";

const UpdateCategory = ({ match }) => {
	const { user, token } = isAuthenticated();

	const [values, setValues] = useState({
		name: "",

		loading: false,
		error: "",
		createdProduct: "",
		getaRedirect: false,
		formData: "",
	});
	const {
		name,

		error,
		createdProduct,

		formData,
	} = values;

	const preload = (categoryId) => {
		getCategory(categoryId).then((data) => {
			console.log(data);
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setValues({
					...values,
					name: data.name,

					formData: new FormData(),
				});
			}
		});
	};

	const handleChange = (name) => (event) => {
		const value = event.target.value;
		console.log(value);
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
					<h4>{createdProduct} error in updating category</h4>
				</div>
			);
		}
	};
	useEffect(() => {
		preload(match.params.categoryId);
	}, []);

	const onSubmit = (event) => {
		event.preventDefault();
		setValues({ ...values, error: "", loading: true });
		console.log(values);

		updateCategory(match.params.categoryId, user._id, token, formData).then(
			(data) => {
				if (data.error) {
					setValues({ ...values, error: data.error });
					console.log(data.error);
				} else {
					setValues({
						...values,
						name: "",

						loading: false,
						createdProduct: data.name,
					});
				}
			}
		);
	};
	const createProductForm = () => (
		<form>
			<h3>Edit Category Name</h3>

			<div className="form-group m-2">
				<input
					onChange={handleChange("name")}
					className="form-control"
					placeholder="Name"
					value={name}
				/>
			</div>

			<button
				type="submit"
				onClick={onSubmit}
				className="btn btn-outline-success mb-3"
			>
				Update Category
			</button>
		</form>
	);
	return (
		<Base>
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

export default UpdateCategory;
