import "../styles.css";

import { API } from "../backend.js";
import Base from "./Base";
import CategoryPanel from "./CategoryPanel";
import Card from "./Card";
import { useEffect, useState } from "react";

export default function Home() {
	const [products, setProducts] = useState({});

	useEffect(() => {
		fetch(`${API}/products`)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setProducts(data);
			});
	}, []);
	console.log("API IS ", API);

	return (
		<Base>
			<CategoryPanel />
			<div className="row">
				{products.length > 0 &&
					products.map((product) => {
						return (
							<div className="col-md-3 col-md-push-4" key={product._id}>
								<Card product={product} />
							</div>
						);
					})}
			</div>
		</Base>
	);
}
