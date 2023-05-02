import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../layout/MetaData'
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import Invoice from './Invoice'
import { useSelector } from 'react-redux'
import Button from '@mui/material/Button';



const OrderSuccess = () => {
    const { user } = useSelector(state => state.auth)
    // let user = JSON.parse(localStorage.getItem('user'));
    let cart = JSON.parse(localStorage.getItem('cartItems'));
    let orderinfo = JSON.parse(sessionStorage.getItem('orderInfo'));
    let shippinginfo = JSON.parse(localStorage.getItem('shippingInfo'));

    const receiptData = {
        date: new Date().toLocaleDateString(),
        customer: user.name,
        items: cart,
        address: shippinginfo.address,
        city: shippinginfo.city,
        country: shippinginfo.country,
        phone: shippinginfo.phoneNo,
        postal: shippinginfo.postalCode,
        tax: orderinfo.taxPrice,
        shipping: orderinfo.shippingPrice,
        subtotal: orderinfo.itemsPrice,
        totalprice: orderinfo.totalPrice,
    }

    return (
        <Fragment>
            <MetaData title={'Order Success'} />
            <div className="row justify-content-center white ">
                <div className="col-6 mt-5 text-center">

                    <img className="my-5 img-fluid d-block mx-auto" src="/images/order_success.png" alt="Order Success" width="200" height="200" />
                    <h2>Your Order has been placed successfully.</h2>
                    {/* <Button variant="contained">
component={RouterLink}
                    </Button> */}
                    <PDFDownloadLink document={<Invoice receiptData={receiptData} />} fileName="receipt.pdf">
                        {({ blob, url, loading, error }) =>
                         <Button variant="contained" color="primary" sx={{ backgroundColor: '#2E3440', "&:hover": { backgroundColor: '#5e81ac', color: "#FFF" }, zIndex: 1600 }} >
                         {loading ? 'Loading document...' : 'Download Receipt'}
                       </Button>
                        // loading ? 'Loading document...' : 'Download Receipt'
                        }
                    </PDFDownloadLink><br></br><br></br>
                    <Button variant="contained" component={Link} to="/orders/me" sx={{ backgroundColor: '#2E3440', "&:hover": { backgroundColor: '#5e81ac', color: "#FFF" }, zIndex: 1600 }} >
Go to Orders
                    </Button> <br></br><br></br>
                    {/* <Link to="/orders/me">Go to Orders</Link> */}
                </div>

                <PDFViewer width="1000" height="600" className="app" >
                <Invoice receiptData={receiptData}/>
            </PDFViewer>

            </div>
        </Fragment>
    )
}
export default OrderSuccess