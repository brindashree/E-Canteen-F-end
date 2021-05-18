import { useEffect, useState } from "react";
import { API } from "../backend";
import { Link, withRouter } from "react-router-dom";

const CategoryPanel = () => {
	const [categories, setCategories] = useState({});

	useEffect(() => {
		fetch(`${API}/categories`)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setCategories(data);
			});
	}, []);

	return (
		<nav className="navbar navbar-expand-lg categories">
			<div className="container-fluid categorypanel">
				<div className=" d-flex">
					<ul className="navbar-nav  ">
						{categories.length > 0 &&
							categories.map((cate) => {
								return (
									<li className="nav-item mx-2 " key={cate._id}>
										<Link className="nav-link text-white" to="/">
											{cate.name}
										</Link>
									</li>
								);
							})}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default CategoryPanel;
