import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import {
	getProduct,
	getCategories,
	updateProduct,
} from "./helper/adminapicall";

const UpdateProduct = ({ match }) => {
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

	const preload = (productId) => {
		getProduct(productId).then((data) => {
			console.log(data);
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				preloadCategories();
				setValues({
					...values,
					name: data.name,
					description: data.description,
					price: data.price,
					category: data.category._id,
					stock: data.stock,
					formData: new FormData(),
				});
			}
		});
	};

	const preloadCategories = () => {
		return getCategories().then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setValues({
					categories: data,
					formData: new FormData(),
				});
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
					<h4>{createdProduct} error in updating product</h4>
				</div>
			);
		}
	};
	useEffect(() => {
		preload(match.params.productId);
	}, []);

	const onSubmit = (event) => {
		event.preventDefault();
		setValues({ ...values, error: "", loading: true });
		console.log(values);
		updateProduct(match.params.productId, user._id, token, formData).then(
			(data) => {
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
			}
		);
	};
	const createProductForm = () => (
		<form>
			<h3>Post photo</h3>
			<div className="form-group m-2">
				<label className="btn btn-block btn-success">
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

			<button
				type="submit"
				onClick={onSubmit}
				className="btn btn-outline-success mb-3"
			>
				Update Product
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

export default UpdateProduct;
