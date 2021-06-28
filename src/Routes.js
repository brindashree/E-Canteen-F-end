import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AdminRoute from "./auth/helper/AdminRoutes";
import Home from "./core/Home";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import UserDashBoard from "./user/UserDashBoard";
import AdminDashBoard from "./user/AdminDashBoard";
import CardList from "./core/CardList";
import AddCategory from "./admin/AddCategory";
import UpdateProduct from "./admin/UpdateProduct";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import ManageCategories from "./admin/ManageCategories";
import UpdateCategory from "./admin/UpdateCategory";
import Cart from "./core/Cart";
import ManageUsers from "./admin/ManageUsers";
import UpdateUser from "./admin/UpdateUser";
import ManageOrders from "./admin/ManageOrders";
import AllOrders from "./admin/AllOrders";
import CancelledOrders from "./admin/CancelledOrders";

const Routes = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/signup" exact component={Signup} />
				<Route path="/signin" exact component={Signin} />
				<Route
					path="/categories/:id"
					exact
					component={(props) => (
						<CardList {...props} key={window.location.pathname} />
					)}
				/>
				<PrivateRoute path="/user/dashboard" exact component={UserDashBoard} />
				<PrivateRoute path="/cart" exact component={Cart} />

				<AdminRoute path="/admin/dashboard" exact component={AdminDashBoard} />
				<AdminRoute
					path="/admin/create/category"
					exact
					component={AddCategory}
				/>
				<AdminRoute
					path="/admin/categories"
					exact
					component={ManageCategories}
				/>
				<AdminRoute path="/admin/create/product" exact component={AddProduct} />
				<AdminRoute path="/admin/products" exact component={ManageProducts} />
				<AdminRoute
					path="/admin/product/update/:productId"
					exact
					component={UpdateProduct}
				/>
				<AdminRoute
					path="/admin/category/update/:categoryId"
					exact
					component={UpdateCategory}
				/>
				<AdminRoute path="/admin/users" exact component={ManageUsers} />
				<AdminRoute path="/admin/orders" exact component={ManageOrders} />

				<AdminRoute path="/admin/orders/all" exact component={AllOrders} />
				<AdminRoute
					path="/admin/orders/cancelled"
					exact
					component={CancelledOrders}
				/>

				<AdminRoute
					path="/admin/user/update/:rbuserId"
					exact
					component={UpdateUser}
				/>
			</Switch>
		</BrowserRouter>
	);
};

export default Routes;
