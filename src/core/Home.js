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
				// console.log("API IS ", API);

				setProducts(data);
			});
	}, []);

	return (
		<Base>
			<CategoryPanel />
			<div style={{ backgroundColor: " #fffbeb" }}>
				<section className="menu section">
					<div className="section-center">
						{products.length > 0 &&
							products.map((product) => {
								return <Card product={product} key={product._id} />;
							})}
					</div>
				</section>
			</div>
		</Base>
	);
}
