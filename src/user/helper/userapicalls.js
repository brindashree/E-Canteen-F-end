import { API } from "../../backend";

export const cancelOrderByUser = (orderId, userId, token) => {
	return fetch(`${API}/order/${orderId}/status/cancel/${userId}`, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const updatePaymentSuccess = (orderId, userId, token) => {
	return fetch(`${API}/order/${orderId}/status/pay/success/${userId}`, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};
