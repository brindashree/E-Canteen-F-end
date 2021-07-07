import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { createProduct, getCategories } from "./helper/adminapicall";

const AddProduct = () => {
	const { user, token } = isAuthenticated();

	const [values, setValues] = useState({
		name: "",
		description: "",
		price: "",

		photo: "",
		categories: [],
		category: "",
		loading: false,
		error: "",
		createdProduct: "",
		getaRedirect: false,
		formData: "",
	});
	const {
		name,
		description,
		price,

		categories,

		error,
		createdProduct,

		formData,
	} = values;

	const preload = () => {
		getCategories().then((data) => {
			console.log(data);
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setValues({ ...values, categories: data, formData: new FormData() });
			}
		});
	};

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
				<h4>{createdProduct} created successfully</h4>
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
					<h4>{createdProduct} error in creating product</h4>
				</div>
			);
		}
	};
	useEffect(() => {
		preload();
	}, []);

	const onSubmit = (event) => {
		event.preventDefault();
		setValues({ ...values, error: "", loading: true });
		createProduct(user._id, token, formData).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setValues({
					...values,
					name: "",
					description: "",
					price: "",
					photo: "",

					loading: false,
					createdProduct: data.name,
				});
			}
		});
	};
	const goBack = () => (
		<div className="px-3 py-3">
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
	const createProductForm = () => (
		<div className="adminaddcard px-4 py-4">
			<form>
				<h3 className="fw-bold text-center">Add Product</h3>
				<div className="form-group m-2">
					<label className="btn btn-block">
						<input
							onChange={handleChange("photo")}
							type="file"
							name="photo"
							accept="image"
							placeholder="choose a file"
						/>
					</label>
				</div>
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
						onChange={handleChange("description")}
						name="photo"
						className="form-control"
						placeholder="Description"
						value={description}
					/>
				</div>
				<div className="form-group m-2">
					<input
						onChange={handleChange("price")}
						type="number"
						className="form-control"
						placeholder="Price"
						value={price}
					/>
				</div>
				<div className="form-group m-2">
					<select
						onChange={handleChange("category")}
						className="form-control"
						placeholder="Category"
					>
						<option>Select</option>
						{categories &&
							categories.map((cate, index) => {
								return (
									<option key={index} value={cate._id}>
										{cate.name}
									</option>
								);
							})}
					</select>
				</div>
				<div className="flexdiv">
					<button
						type="submit"
						onClick={onSubmit}
						className="btn signinbtn mb-3"
					>
						Create Product
					</button>
				</div>
			</form>
		</div>
	);
	return (
		<Base>
			<div
				className="container-fluid"
				style={{ minHeight: "65vh", backgroundColor: " #fffbeb" }}
			>
				{goBack()}
				<div className="row">
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

export default AddProduct;
