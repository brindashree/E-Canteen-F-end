import { useEffect, useState } from "react";
import Base from "./Base";
import Card from "./Card";
import CategoryPanel from "./CategoryPanel";
import { API } from "../backend.js";

const CardList = ({ match }) => {
	const [cateid, setCateId] = useState(match.params.id);
	const [products, setProducts] = useState({});

	useEffect(() => {
		fetch(`${API}/products`)
			.then((response) => response.json())
			.then((data) => {
				setProducts(data.filter((prod) => prod.category._id === cateid));
				setCateId((c) => cateid);
			});
	}, [cateid]);

	return (
		<Base>
			<CategoryPanel />

			<div style={{ backgroundColor: " #fffbeb", minHeight: "65vh" }}>
				<section className="menu section">
					{products.length == 0 && (
						<div className="signin card flexdiv text-center">
							<div className="card-header fw-bold fs-5">
								No available products in this category
							</div>
						</div>
					)}
					<div className="section-center">
						{products.length > 0 &&
							products.map((product) => {
								return <Card key={product._id} product={product} />;
							})}
					</div>
				</section>
			</div>
		</Base>
	);
};

export default CardList;
