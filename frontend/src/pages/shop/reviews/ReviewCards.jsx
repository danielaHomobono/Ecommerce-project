import React from 'react'
import commentorIcon from "../../../assets/avatar.png"

// Función para formatear la fecha
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString();
}

const ReviewCards = ({productReviews}) => {
    const reviews = productReviews || [];
    console.log("Reviews recibidas:", reviews);
    
    return (
        <div className='my-6 bg-white p-8 rounded-lg shadow-sm'>
            <h3 className='text-xl font-semibold mb-4'>Product Reviews</h3>
            
            {reviews.length > 0 ? (
                <div className="space-y-6">
                    {reviews.map((review, index) => (
                        <div key={index} className='border-b pb-4 last:border-0'>
                            <div className="flex items-center gap-3">
                                <img src={commentorIcon || "/placeholder.svg"} alt="" className='size-12 rounded-full'/> 
                                <div>
                                    <p className="font-medium">{review?.userId?.username || "Usuario"}</p>
                                    <p className="text-sm text-gray-500">{formatDate(review?.createdAt)}</p>
                                </div>
                                <div className="ml-auto flex">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className={`text-lg ${i < review.rating ? "text-yellow-500" : "text-gray-300"}`}>★</span>
                                    ))}
                                </div>
                            </div>
                            <p className="mt-3 text-gray-700">{review?.comment}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">No reviews yet for this product</p>
                    <p className="text-sm mt-2">Be the first to leave a review!</p>
                </div>
            )}
        </div>
    )
}

export default ReviewCards