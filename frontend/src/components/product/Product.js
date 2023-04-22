import React from 'react'
import { Link } from "react-router-dom";

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
    return (
        <div className="col-sm-12 col-md-6 col-lg-3 my-3">
             <div class="offer offer-radius offer-success">
             <div class="shape">
	 				<div class="shape-text">
                     <p>${product.price}</p>							
	 				</div>
	 			</div>
           
            <div className="p-3 rounded">
                <img
                    className="card-img-top mx-auto"
                    src={product.images[0].url}
                />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                        <a href="">{product.name}</a>
                    </h5>
                    <div className="ratings mt-auto">
                        <div className="rating-outer">
                            <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
                        </div>
                        <span id="no_of_reviews">({product.numOfReviews} reviews)</span>
                    </div><br></br>
                    <span class="fifty-chars">{product.description}</span> <br></br>
                   
                   
                    {/* <BrowserRouter> */}
                        <Link to={`product/${product._id}`} id="view_btn" className="btn btn-block">View Details</Link>
                    {/* </BrowserRouter> */}

                </div>
            </div>
            </div>
        </div>
    )
}
export default Product