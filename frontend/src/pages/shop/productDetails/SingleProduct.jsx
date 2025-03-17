import React from 'react'
import { Link, useParams } from 'react-router-dom'
import RatingStars from '../../../components/RatingStars';
import { useDispatch } from 'react-redux';
import { useFetchProductByIdQuery } from '../../../redux/features/products/productsApi';
import { addToCart } from '../../../redux/features/cart/cartSlice';
import ReviewCards from '../reviews/ReviewCards';
// Importar los productos locales
import products from "../../../data/products";

const SingleProduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    
    // Verificar si el ID es numérico (de datos locales) o un ID de MongoDB
    const isLocalProduct = !isNaN(id);
    
    // Si es un producto local, obtenerlo del archivo de datos
    const localProduct = isLocalProduct ? products.find(p => p.id === parseInt(id)) : null;
    
    // Solo usar la API si no es un producto local
    const skipApiCall = isLocalProduct && localProduct;
    const { data, error, isLoading } = useFetchProductByIdQuery(id, { 
        skip: skipApiCall 
    });
    
    console.log("ID del producto recibido:", id);
    console.log("¿Es producto local?", isLocalProduct);
    console.log("Producto local:", localProduct);
    
    // Usar el producto local o el de la API
    const singleProduct = localProduct || data?.product || {};
    const productReviews = data?.reviews || [];
    
    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }
    
    // Solo mostrar carga si estamos esperando datos de la API y no es un producto local
    if (isLoading && !isLocalProduct) {
        return <div>Loading...</div>;
    }
    
    // Solo mostrar error si hay un error de la API y no es un producto local
    if (error && !isLocalProduct) {
        return <div>Error: {error.message}</div>;
    }
    
    // Si es un producto local pero no se encontró
    if (isLocalProduct && !localProduct) {
        return <div>Error: Producto local no encontrado</div>;
    }
    
    return (
        <>
            <section className='section__container bg-primary-light'>
                <h2 className='section__header capitalize'>Single Product Page</h2>
                <div className='section__subheader space-x-2'>
                    <span className='hover:text-primary'><Link to="/">home</Link></span>
                    <i className="ri-arrow-right-wide-line"></i>
                    <span className='hover:text-primary'><Link to="/shop">shop</Link></span>
                    <i className="ri-arrow-right-wide-line"></i>
                    <span className='hover:text-primary'><Link to="/shop">{singleProduct?.name || "product name"}</Link></span>
                </div>
            </section>
            <section className='section__container mt-8'>
                <div className='flex flex-col items-center md:flex-row gap-8'>
                    {/*Product Image*/}
                    <div className='md:w-1/2 w-full'>
                        <img src={singleProduct?.image || "/placeholder.svg"} alt={singleProduct?.name} className='rounded-md w-full h-auto'/>
                    </div>
                    <div className='md:w-1/2 w-full'>
                        <h3 className='text-2xl font-semibold mb-4'>{singleProduct?.name}</h3>
                        <p className='text-xl text-primary mb-4'>${singleProduct?.price} 
                            {singleProduct?.oldPrice && <s className='ml-2'> ${singleProduct?.oldPrice}</s>}
                        </p>
                        <p className='text-gray-400 mb-4'>{singleProduct?.description}</p>
                        {/*Aditional information product*/}
                        <div className='flex flex-col space-y-2'>
                            <p><strong>Category:</strong> {singleProduct?.category}</p>
                            <p><strong>Color:</strong> {singleProduct?.color}</p>
                            <div className='flex gap-1 items-center'>
                                <strong>Rating</strong>
                                <RatingStars rating={singleProduct?.rating} />
                            </div>
                        </div>
                        <button 
                            onClick={(e) => {
                                e.stopPropagation()
                                handleAddToCart(singleProduct)
                            }}
                            className='mt-6 px-6 py-3 bg-primary text-white rounded'>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </section>
            {/*Related Products*/}
            {/*TO DO */}

            <section className='section__container mt-8'>
                {!isLocalProduct && <ReviewCards productReviews={productReviews} />}
                {isLocalProduct && <div>Las reseñas no están disponibles para productos locales</div>}
            </section>
        </>
    )
}

export default SingleProduct