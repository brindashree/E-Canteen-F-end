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
