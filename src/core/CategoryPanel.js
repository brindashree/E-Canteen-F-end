import { useEffect, useState } from "react";
import { API } from "../backend";
import { Link } from "react-router-dom";

const CategoryPanel = () => {
	const [categories, setCategories] = useState({});

	useEffect(() => {
		fetch(`${API}/categories`)
			.then((response) => response.json())
			.then((data) => {
				setCategories(data);
			});
	}, []);

	return (
		// <nav className="navbar navbar-expand-lg categories">
		// 	<div className="container-fluid categorypanel">
		// 		<div className=" d-flex scroll">
		// 			<ul className="navbar-nav ">
		// 				{categories.length > 0 &&
		// 					categories.map((cate) => {
		// 						return (
		// 							<li className="nav-item mx-2 fs-5" key={cate._id}>
		// 								<Link
		// 									className="nav-link catlink"
		// 									to={`/categories/${cate._id}`}
		// 								>
		// 									{cate.name}
		// 								</Link>
		// 							</li>
		// 						);
		// 					})}
		// 			</ul>
		// 		</div>
		// 	</div>
		// </nav>

		<div className="scroller">
			{categories.length > 0 &&
				categories.map((cate) => {
					return (
						<Link
							key={cate._id}
							className=" catlink"
							to={`/categories/${cate._id}`}
						>
							{cate.name}
						</Link>
					);
				})}
		</div>
	);
};

export default CategoryPanel;
