import React, { Fragment, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from 'react-redux'
import { createOrder, clearErrors } from '../../actions/orderActions'
import { clearCart } from '../../actions/cartActions';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import OfflinePinIcon from '@mui/icons-material/OfflinePin';
const Payment = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const goBack = () => {
		navigate(-1);
	}
    const { user } = useSelector(state => state.auth)
    const { cartItems, shippingInfo } = useSelector(state => state.cart);
    const { error } = useSelector(state => state.newOrder)
    useEffect(() => {
        if (error) {
            dispatch(clearErrors())
        }

   }, [dispatch, error])
    const order = {
        orderItems: cartItems,
        shippingInfo
    }
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
    if (orderInfo) {
        order.itemsPrice = orderInfo.itemsPrice
        order.shippingPrice = orderInfo.shippingPrice
        order.taxPrice = orderInfo.taxPrice
        order.totalPrice = orderInfo.totalPrice
    }

    const notify = (message = '') => toast.success(message, {
		icon: () =>  <OfflinePinIcon color='success'/> ,
        position: toast.POSITION.TOP_RIGHT
    });

    const submitHandler = async (e) => {
        e.preventDefault();
        document.querySelector('#pay_btn').disabled = true;
        order.paymentInfo = {
            id: 'pi_1DpdYh2eZvKYlo2CYIynhU32',
            status: 'succeeded'
        }
        dispatch(createOrder(order))
        dispatch(clearCart())
        notify('Order Payment Success.')
        navigate('/')
    }
    return (
        <Fragment>
            <MetaData title={'Payment'} />
            <IconButton sx={{ml: 3, my: 1}}  onClick={() => {
    goBack()
  }}><ArrowBackIcon sx={{fontSize: 35, color: '#fff'}}></ArrowBackIcon></IconButton>
            <CheckoutSteps shipping confirmOrder payment />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg white" onSubmit={submitHandler}>
                        <h1 className="mb-4">Card Info</h1>
                        <div className="form-group">
                            <label htmlFor="card_num_field">Card Number</label>

                            <input

                                type="number"

                                id="card_num_field"

                                className="form-control"

                                required



                            />

                        </div>



                        <div className="form-group">

                            <label htmlFor="card_exp_field">Card Expiry</label>

                            <input

                                type="text"

                                id="card_exp_field"

                                className="form-control"

                                required



                            />

                        </div>



                        <div className="form-group">

                            <label htmlFor="card_cvc_field">Card CVC</label>

                            <input

                                type="text"

                                id="card_cvc_field"

                                className="form-control"

                                required



                            />

                        </div>





                        <button

                            id="pay_btn"

                            type="submit"

                            className="btn btn-block py-3"

                        >

                            Pay {` - ${orderInfo && orderInfo.totalPrice}`}

                        </button>



                    </form>

                </div>

            </div><br></br><br></br>



        </Fragment>

    )

}



export default Payment

