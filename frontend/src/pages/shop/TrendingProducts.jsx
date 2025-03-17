import React from 'react'
import ProductCard from './ProductCard'
import products from "../../data/products"

const TrendingProducts = () => {
const [visibleProducts, setVisibleProducts] = React.useState(8);
const loadMoreProducts = () => {
    setVisibleProducts (prevCount => prevCount + 4);
  }


  return (
    <section className='section__container product__container'>
        <h2 className='section__header'>Trendings Products</h2>
        <p className='section__subheader mb-12'>Discover the latest Picks: Elevate your Style with Our Curated Collection of Trending Womwn's Fashion Products</p>

{/* products card 
<ProductCard products={products.slice(0,visibleProducts)} />*/}
{/* Load more button */}
<ProductCard products={products.slice(0,visibleProducts).map(product => ({
  ...product,
  _id: product.id || product._id || 'default-id'  // Usa product.id si existe, o product._id, o un valor predeterminado
}))} />
<div className='product__btn'>
  {
    visibleProducts < products.length && (
      <button className='btn' onClick={loadMoreProducts}>Load More</button>
    )
  }
</div>
    </section>
  )
}

export default TrendingProducts