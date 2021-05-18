import React from "react";
import ImageHelper from "./helper/ImageHelper";

const Card = ({ product }) => {
	console.log(product);
	return (
		<div className="card prodcard ms-1 my-2 ">
			<div className="card-body">
				<ImageHelper product={product} />
				<div className="cardinfo">
					<h5 className=" font-weight-normal">{product.name}</h5>

					<span className="btn btn-success rounded  btn-sm  fs-6">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							className="bi bi-star-fill"
							viewBox="0 0 16 16"
						>
							<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
						</svg>
						<span className="ps-3 fs-6">5.5</span>
					</span>
				</div>
				<h6>Rs.{product.price}</h6>
				<p className="text-muted">{product.description}</p>

				<div className=" d-flex justify-content-center ">
					<button onClick={() => {}} className="btn addbtn btn-block mt-2 mb-2">
						Add to Cart
					</button>
				</div>
			</div>
		</div>
	);
};

export default Card;
