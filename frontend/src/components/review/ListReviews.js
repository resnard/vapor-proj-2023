import React from 'react'
{/* <div class="comment mt-4 text-justify float-left">
<img src="https://i.imgur.com/yTFUilP.jpg" alt="" class="rounded-circle" width="40" height="40">
<h4>Jhon Doe</h4>
<span>- 20 October, 2018</span>
<br>
<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus numquam assumenda hic aliquam vero sequi velit molestias doloremque molestiae dicta?</p>
</div> */}
const ListReviews = ({ reviews }) => {
    return (
       
        <div className="reviews w-100 mt-5">
            <h3>User Reviews:</h3>
            <hr />
            {reviews && reviews.map(review => (
                <div class="comment mt-2 mb-2 text-justify float-left">
                <div key={review._id} class="review-card my-3">
                    <div className="rating-outer">
                        <div className="rating-inner" style={{ width: `${(review.rating / 5) * 100}%` }}></div>
                    </div>
                    <p className="review_user">by {review.name}</p>
                    <p className="review_comment">{review.comment}</p>
                    <hr />
                </div>
                </div>
            ))}
        </div>
        
    )
}

export default ListReviews