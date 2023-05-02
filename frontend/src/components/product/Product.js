import React from 'react'
import { Link } from "react-router-dom";
import { addItemToCart } from '../../actions/cartActions'
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { toast, ToastContainer } from 'react-toastify';

const Product = ({ product }) => {
    // <div class="offer offer-success">
    // 			<div class="shape">
    // 				<div class="shape-text">
    // 					top								
    // 				</div>
    // 			</div>
    // 			<div class="offer-content">
    // 				<h3 class="lead">
    // 					A success offer
    // 				</h3>						
    // 				<p>
    // 					And a little description.
    // 					<br> and so one
    // 				</p>
    // 			</div>
    // 		</div>
    const dispatch = useDispatch();
    const notify = (message = '') => toast.success(message, {
		icon: () =>  <AddShoppingCartIcon color='success'/> ,
        position: toast.POSITION.TOP_LEFT
    });
    const notifye = (message = '') => toast.error(message, {
		// icon: () =>  <AddShoppingCartIcon color='success'/> ,
        position: toast.POSITION.TOP_LEFT
    });
    const { user } = useSelector(state => state.auth)
    const addToCart = (id) => {
        if(user){
            notify('Added to cart successfully.')
            dispatch(addItemToCart(id, 1))
        }else{
            notifye('Log in to add items to cart.')
        }
      
        
        // alert.ssuccess('Item Added to Cart')
    }
console.log(product.length)
    return (
        <div className="col-sm-12 col-md-6 col-lg-3 my-3">

            <div class="offer offer-radius offer-success prodCard">

                <div class="shape">
                    <div class="shape-text">
                        <p>${product.price}</p>
                    </div>
                    </div>

                <div className="p-3 rounded">
                {/* <Link to={`/product/${product._id}`} style={{ color: 'inherit', textDecoration: 'inherit' }}> */}
                    <img
                        className="card-img-top mx-auto d-flex"
                        src={product.images[0].url}
                    />
                    <div className="card-body d-flex flex-column p-3 ">
                        <h5 className="card-title">
                            <a href="">{product.name}</a>
                        </h5>
                        <div className="ratings mt-auto">
                            <div className="rating-outer">
                                <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
                            </div>
                            <span id="no_of_reviews">({product.numOfReviews} reviews)</span>
                        </div> <br></br>
                        <div class="descw">
                            <span class="desctxt">{product.description}</span></div><br></br>
                      
                       

                        {/* <BrowserRouter> */}
                        {/* <Link to={`product/${product._id}`} id="view_btn" className="btn btn-block">View Details</Link> */}
                        
                        {/* <Button color="neutral"  onClick={addToCart}>Add To Cart</Button> */}
                        {/* </BrowserRouter> */}

                    </div>
                    {/* </Link> */}
                </div>
                            <div className='  mt-n3  mb-5 d-flex justify-content-center'>
                            <Button variant="contained" sx={{ backgroundColor: '#434C5E', "&:hover": { backgroundColor: '#5e81ac', color: "#FFF" }, zIndex: 1600 }} onClick={() => addToCart(product._id)}><AddShoppingCartIcon sx={{color: '#FFF', mr: 3}}/>  Add To Cart</Button></div>
            </div>

        </div>
    )
}
export default Product