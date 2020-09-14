import React from 'react'

function ReviewCard({review}) {
    const {title, comment} = review
    return (
        <div className='review-card'>
            <h5>{title}</h5>
            <p>{comment}</p>
        </div>
    )
}

export default ReviewCard
