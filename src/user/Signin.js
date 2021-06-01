import React, { useState } from "react";
import Base from "../core/Base";
import { Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth/helper";

const Signin = () => {
	const [values, setValues] = useState({
		email: "poojang@gmail.com",
		password: "123456",
		error: "",
		loading: false,
		didRedirect: false,
	});

	const { email, password, error, loading, didRedirect } = values;
	const { user } = isAuthenticated();

	const handleChange = (name) => (event) => {
		//...values = loads all the existing values
		setValues({ ...values, error: false, [name]: event.target.value });
	};

	const onSubmit = (event) => {
		event.preventDefault();
		setValues({ ...values, error: false, loading: true });
		signin({ email, password })
			.then((data) => {
				if (data.error) {
					setValues({ ...values, error: data.error, loading: true });
				} else {
					authenticate(data, () => {
						setValues({ ...values, didRedirect: true });
					});
				}
			})
			.catch(console.log("Sign in request failed!"));
	};

	const performRedirect = () => {
		if (didRedirect) {
			if (user && user.role === 2) {
				return <Redirect to="/admin/dashboard" />;
			} else {
				return <Redirect to="/user/dashboard" />;
			}
		}
		if (isAuthenticated()) {
			return <Redirect to="/" />;
		}
	};

	const loadingMessage = () => {
		return (
			loading && (
				<div className="alert alert-info">
					<h2>Loading.....</h2>
				</div>
			)
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

	const signInForm = () => {
		return (
			<div className="d-flex justify-content-center">
				<div className="signin card col-6 mt-5">
					<div className="card-header">
						<h2 className="text-center fw-bolder">Sign In</h2>
					</div>
					<div className="row">
						<div className="col-md-6 offset-sm-3 text-left">
							<form>
								<div className="input-group mb-3 mt-3">
									<span className="input-group-text fw-bolder fs-5">Email</span>
									<input
										value={email}
										onChange={handleChange("email")}
										className="form-control fw-bolder fs-5"
										type="email"
									/>
								</div>

								<div className="input-group mb-3">
									<span className="input-group-text fw-bolder fs-5">
										Password
									</span>
									<input
										value={password}
										onChange={handleChange("password")}
										className="form-control fw-bolder fs-5"
										type="password"
									/>
								</div>

								<div className="flexdiv">
									<button
										onClick={onSubmit}
										className="btn fw-bolder signinbtn mb-3"
									>
										Sign In
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	};

	return (
		<Base>
			<div className="container-fluid" style={{ minHeight: "65vh" }}>
				{loadingMessage()}
				{errorMessage()}
				{signInForm()}
				{performRedirect()}
				<p className=" text-center">{JSON.stringify(values)}</p>
			</div>
		</Base>
	);
};

export default Signin;
