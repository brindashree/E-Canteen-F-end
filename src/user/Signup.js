import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";

const Signup = () => {
	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
		error: "",
		success: false,
	});

	//to avoid using values.name, values.email .....so on, we destructure as below!
	const { name, email, password, error, success } = values;

	const handleChange = (name) => (event) => {
		//...values = loads all the existing values
		setValues({ ...values, error: false, [name]: event.target.value });
	};

	const onSubmit = (event) => {
		event.preventDefault();
		setValues({ ...values, error: false });
		signup({ name, email, password })
			.then((data) => {
				if (data.error) {
					setValues({ ...values, error: data.error, success: false });
				} else {
					setValues({
						...values,
						name: "",
						email: "",
						password: "",
						error: "",
						success: true,
					});
				}
			})
			.catch(console.log("Error in SignUp"));
	};

	const signUpForm = () => {
		return (
			<div className="d-flex justify-content-center ">
				<div className="card signin col-6 mt-5">
					<div className="card-header">
						<h2 className="text-center fw-bolder">Sign Up</h2>
					</div>
					<div className="row">
						<div className="col-md-6 offset-sm-3 text-left">
							<form>
								<div className="input-group mb-3 mt-3">
									<span className="input-group-text fw-bolder fs-5">Name</span>
									<input
										className="form-control fw-bolder fs-5"
										onChange={handleChange("name")}
										type="text"
										value={name}
									/>
								</div>

								<div className="input-group mb-3 mt-3">
									<span className="input-group-text fw-bolder fs-5">Email</span>
									<input
										className="form-control fw-bolder fs-5"
										onChange={handleChange("email")}
										value={email}
										type="email"
									/>
								</div>

								<div className="input-group mb-3 mt-3">
									<span className="input-group-text fw-bolder fs-5">
										Password
									</span>
									<input
										className="form-control fw-bolder fs-5"
										onChange={handleChange("password")}
										type="password"
										value={password}
									/>
								</div>
								<div className="flexdiv">
									<button
										onClick={onSubmit}
										className="btn fw-bolder signinbtn mb-3"
									>
										Sign Up
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	};

	const successMessage = () => {
		return (
			<div className="row">
				<div className="col-md-6 offset-sm-3 text-left">
					<div
						className="alert alert-success"
						style={{ display: success ? "" : "none" }}
					>
						New account was created successfully . Please{" "}
						<Link to="/signin">Login here</Link>
					</div>
				</div>
			</div>
		);
	};

	const errorMessage = () => {
		return (
			<div className="row">
				<div className="col-md-6 offset-sm-3 text-left">
					<div
						className="alert alert-danger"
						style={{ display: error ? "" : "none" }}
					>
						{error}
					</div>
				</div>
			</div>
		);
	};

	return (
		<Base>
			<div className="container-fluid " style={{ minHeight: "65vh" }}>
				{successMessage()}
				{errorMessage()}
				{signUpForm()}
				<p className=" text-center">{JSON.stringify(values)}</p>
			</div>
		</Base>
	);
};

export default Signup;
