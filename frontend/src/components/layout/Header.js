import React, { Fragment } from 'react'
import '../../App.css'
import Search from './Search'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import DeleteIcon from '@mui/icons-material/Delete';
import {Tooltip, IconButton, Badge} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { grey } from '@mui/material/colors';


import { logout } from '../../actions/userActions'
const Header = () => {

	const dispatch = useDispatch();
	const { user, loading } = useSelector(state => state.auth)
	const { cartItems } = useSelector(state => state.cart)
	const logoutHandler = () => {
		dispatch(logout());
	}

	return (
		<Fragment>
			<nav className="navbar row">
				<div className="col-12 col-md-3">
					<div className="navbar-brand">
						<Link to="/">
							<img src="/images/vapor_logo.png" />
						</Link>
						
					</div>
				</div>
				<div className="col-12 col-md-6 mt-2 mt-md-0">
					<Search />
				</div>

				<div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
				
					{user ? (

						<><div className="float-right dropdown d-inline">
							<Tooltip placement="top" title={user && user.name} arrow>
								<Link to="#!" className="btn dropdown-toggle text-white mr-4" type="button" id="dropDownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

									<figure className="avatar avatar-nav">

										<img
											src={user.avatar && user.avatar.url}

											alt={user && user.name}

											className="rounded-circle" />

									</figure>

									{/* <span>{user && user.name}</span> */}

								</Link>
							</Tooltip>

							<div className="dropdown-menu dropdown-r-a" aria-labelledby="dropDownMenuButton">



								{user && user.role === 'admin' && (
									<Link className="dropdown-item" to="/dashboard">Dashboard</Link>

								)}

								<Link className="dropdown-item" to="/cart" style={{ textDecoration: 'none' }}>
									{/* <span id="cart" className="ml-3">Cart</span> */}
									<span id="cart">Your Cart <ShoppingCartIcon color="dark" />                 </span>
									<span class="float-right" className="ml-1" id="cart_count">{cartItems.length}</span>
								</Link>

								<Link className="dropdown-item" to="/orders/me">Orders</Link>

								<Link className="dropdown-item" to="/me">Profile</Link>

								{/*<Link className="dropdown-item text-danger" to="/" onClick={logoutHandler}>*/}

								<Link className="dropdown-item text-danger" to="/" onClick={logoutHandler}>

									Logout

								</Link>
							</div>

						</div>
						<Tooltip placement="top" title="view cart" arrow><Link to="/cart" className="float-right d-inline mr-3 mt-2">
								<Badge badgeContent={cartItems.length} color="info"><ShoppingCartIcon sx={{ color: grey[50], fontSize: 30 }} />  </Badge>
							</Link></Tooltip></>

					) : !loading && <Link to="/login" className="btn ml-4" id="login_btn">Login</Link>}
						
				</div>
			</nav>
		</Fragment>
	)
}

export default Header