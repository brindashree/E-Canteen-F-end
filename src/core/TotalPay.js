import React from "react";
import emailjs from "emailjs-com";

const TotalPay = () => {
	function sendEmail(e) {
		e.preventDefault();

		emailjs
			.sendForm(
				"service_3owpw22",
				"template_owq097y",
				e.target,
				"user_N1HQe4z1V8wJifQ44jyRb"
			)
			.then(
				(result) => {
					console.log(result.text);
				},
				(error) => {
					console.log(error.text);
				}
			);
	}

	return (
		<form className="contact-form" onSubmit={sendEmail}>
			<input type="hidden" name="contact_number" />
			<label>Name</label>
			<input type="text" name="user_name" />
			<label>Email</label>
			<input type="email" name="user_email" />
			<label>Message</label>
			<textarea name="message" />
			<input type="submit" value="Send" />
		</form>
	);
};

export default TotalPay;
