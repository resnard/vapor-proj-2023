import React, { Fragment, useEffect, useState } from 'react'
import { Carousel } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import ListReviews from '../review/ListReviews';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails, clearErrors, newReview } from '../../actions/productActions'
import { addItemToCart } from '../../actions/cartActions'
import { NEW_REVIEW_RESET } from '../../constants/productConstants'
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ProductDetails = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate()
    const goBack = () => {
		navigate(-1);
	}
    let { id } = useParams();
    const [quantity, setQuantity] = useState(1)
    const { loading, error, product } = useSelector(state => state.productDetails);
    const { error: reviewError, success } = useSelector(state => state.newReview)
    const { user } = useSelector(state => state.auth)
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const notify = (error = '') => toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER
    });

    const notifyCA = (message = '') => toast.success(message, {
		icon: () =>  <AddShoppingCartIcon color='success'/> ,
        position: toast.POSITION.TOP_LEFT
    });
    const successMsg = (message = '') => toast.success(message, {
        position: toast.POSITION.BOTTOM_CENTER
    });
    useEffect(() => {
        dispatch(getProductDetails(id))
        if (error) {
            notify(error)
            dispatch(clearErrors())
        }
        if (reviewError) {
            dispatch(clearErrors())
        }
        if (success) {
            successMsg('Reivew posted successfully')
            dispatch({ type: NEW_REVIEW_RESET })
        }
    }, [dispatch, error, reviewError, success, id]);
    const increaseQty = () => {
        const count = document.querySelector('.count')
        if (count.valueAsNumber >= product.stock) return;
        const qty = count.valueAsNumber + 1;
        setQuantity(qty)
    }
    const decreaseQty = () => {
        const count = document.querySelector('.count')
        if (count.valueAsNumber <= 1) return;
        const qty = count.valueAsNumber - 1;
        setQuantity(qty)
    }
    const addToCart = () => {
       
        dispatch(addItemToCart(id, quantity));
        // notifyCA('Added to cart successfully.')
        // alert.success('Item Added to Cart')
    }
    function setUserRatings() {
        const stars = document.querySelectorAll('.star');
        stars.forEach((star, index) => {
            star.starValue = index + 1;
            ['click', 'mouseover', 'mouseout'].forEach(function (e) {
                star.addEventListener(e, showRatings);
            })
        })

        function showRatings(e) {
            stars.forEach((star, index) => {
                if (e.type === 'click') {
                    if (index < this.starValue) {
                        star.classList.add('frost1');
                        setRating(this.starValue)
                    } else {
                        star.classList.remove('frost1')
                    }
                }
                if (e.type === 'mouseover') {
                    if (index < this.starValue) {
                        star.classList.add('frost2');
                    } else {
                        star.classList.remove('frost2')
                    }
                }
                if (e.type === 'mouseout') {
                    star.classList.remove('frost2')
                }
            })
        }
    }
    const reviewHandler = () => {
        const formData = new FormData();
        formData.set('rating', rating);
        formData.set('comment', comment);
        formData.set('productId', id);
        dispatch(newReview(formData));
    }
    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={product.name} />
                    <IconButton sx={{ml: 3, mt: 1, mb: -3, zIndex: 1600}}  onClick={() => {
    goBack()
  }}><ArrowBackIcon sx={{fontSize: 35, color: '#fff'}}></ArrowBackIcon></IconButton>
   <div class="ribbon-wrapper mt-n5">
                    <h3 class="ribbon">
                    <strong class="ribbon-inner">Product Details</strong>
                    </h3>
                    </div>
                    <div className="wrapper1 row  d-flex justify-content-around">
                   
                        <div className="col-12 col-lg-6 img-fluid mt-5" id="product_image">
                            <Carousel pause='hover'>
                                {product.images && product.images.map(image => (
                                    <Carousel.Item key={image.public_id}>
                                        <img className="d-block w-100" src={image.url} alt={product.title} />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                            {product.reviews && product.reviews.length > 0 && (

                            <ListReviews reviews={product.reviews} />

                            )}

                        </div>
                       

                        <div className="col-12 col-lg-4 mt-5 pl-5 mb-n5">
                            <h3>{product.name}</h3>
                            <p id="product_id">Product # {product._id}</p>
                            <p id="product_seller mb-3">Platform: <strong>{product.platform}</strong></p>
                            <p id="product_seller mb-3">Genre: <strong>{product.category}</strong></p>
                            <p id="product_seller mb-3">Developer: <strong>{product.seller}</strong></p>
                           
                            <div className="rating-outer">
                                <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
                            </div>
                            <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>

                            {/* <hr /> */}
                           
                          

                            <hr />

                          

                            <h4 className="mt-2">Description:</h4>
                            <p>{product.description}</p>
                            <hr />

                           

                            <p id="product_price">${product.price}</p>
                            <p>Status: <span id="stock_status" className={product.stock > 0 ? 'greenColor' : 'redColor'} >{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></p>

                            <div className="stockCounter d-inline">
                                <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>

                                <input type="number" className="form-control count d-inline" value={quantity} readOnly />

                                <span className="btn btn-info plus" onClick={increaseQty}>+</span>
                            </div>
                            <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4" onClick={addToCart} >Add to Cart</button>
                            <hr />
                           
                           
                           
                           
                            {user ? <button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal" onClick={setUserRatings}>
                                Submit Your Review
                            </button>
                                :
                                <div className="alert alert-danger mt-5" type='alert'>Login to post your review.</div>
                            }



                            <div className="row mt-2 mb-5">
                                <div className="rating w-50">

                                    <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" >
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">

                                                    <ul className="stars" >
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                    </ul>

                                                    <textarea
                                                        name="review"
                                                        id="review" className="form-control mt-3"
                                                        value={comment}
                                                        onChange={(e) => setComment(e.target.value)}
                                                    >

                                                    </textarea>

                                                    <button className="btn my-3 float-right review-btn px-4 text-white" data-dismiss="modal" aria-label="Close" onClick={reviewHandler}>Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                      
                      
                       
                    </div>

                </Fragment>
            )
            }
        </Fragment >
    )

}

export default ProductDetails