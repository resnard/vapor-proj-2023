import React, { Fragment } from 'react'
import { Link, useNavigate  } from 'react-router-dom'
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MetaData from '../layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart, removeItemFromCart } from '../../actions/cartActions'
const Cart = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const goBack = () => {
		navigate(-1);
	}
    const { cartItems } = useSelector(state => state.cart)
    const increaseQty = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (newQty > stock) return;
        dispatch(addItemToCart(id, newQty))
    }
    const decreaseQty = (id, quantity) => {
        const newQty = quantity - 1;
        if (newQty <= 0) return;
        dispatch(addItemToCart(id, newQty))
    }

    const removeCartItemHandler = (id) => {
        dispatch(removeItemFromCart(id))
    }
    const checkoutHandler = () => {
        navigate('/login?redirect=shipping')
    }

    return (
        <Fragment>
            <MetaData title={'Your Cart'} />
          
            <IconButton sx={{ml: 3, my: 1, position: 'static'}}  onClick={() => {
    goBack()
  }}><ArrowBackIcon sx={{fontSize: 35, color: '#fff'}}></ArrowBackIcon></IconButton>
            <div class="ribbon-wrapper mt-n5">
  <h3 class="ribbon">
<strong class="ribbon-inner">Your Cart</strong>
</h3>
</div>
            {cartItems.length === 0 ? goBack() : (
                <Fragment>
                 
                    {/* <h2 className="mt-5">Your Cart: <b>{cartItems.length} items</b></h2> */}
                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-lg-8 bord-cont">
                            {cartItems.map(item => (
                                <Fragment key={item.product}>
                                    <hr />
                                   <div className="cart-item" >
                                        <div className="row">
                                            <div className="col-4 col-lg-3">
                                                <img src={item.image} alt="Laptop" height="90" width="115" />
                                            </div>
                                            <div className="col-5 col-lg-3">

                                                <Link to={`/products/${item.product}`}><strong>{item.name}</strong></Link>
                                            </div>
                                            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                <p id="card_item_price">${item.price}</p>
                                            </div>
                                            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                <div className="stockCounter d-inline">
                                                    <span className="btn btn-danger minus" onClick={() => decreaseQty(item.product, item.quantity)}>-</span>

                                                    <input type="number" className="form-control count d-inline" value={item.quantity} readOnly />
                                                    <span className="btn btn-primary plus" onClick={() => increaseQty(item.product, item.quantity, item.stock)}>+</span>
                                                </div>
                                            </div>
                                            <div className="col-4 col-lg-1 mt-4 mt-lg-0">

                                                <i id="delete_cart_item" className="fa fa-trash btn btn-danger" onClick={() => removeCartItemHandler(item.product)} ></i>
                                                
                                           </div>
                                        </div>
                                    </div>
                                    <hr />
                                </Fragment>
                            ))}
                        </div>
                        <div className="col-12 col-lg-3 my-4 white">
                            <div id="order_summary">
                                <h4>Order Summary</h4>
                                <hr />
                                <p>Subtotal:  <span className="order-summary-values">{cartItems.reduce((acc, item) => (acc + Number(item.quantity)), 0)} (Units)</span></p>
                                <p>Est. total: <span className="order-summary-values">${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}</span></p>
                                <hr />

                                <button id="checkout_btn" className="btn btn-primary btn-block" onClick={checkoutHandler} >Check out</button>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>

    )

}



export default Cart

