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
			<div>
				<CategoryPanel />
			</div>

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
};

export default CardList;
