import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import products from '../../data/products.json'
import ProductCard from '../shop/ProductCard'


const CategoryPage = () => {

    const {categoryName} = useParams();
    const[filteredProducts, setFilteredProducts] = React.useState([]);

    useEffect(() => {
        const filtered = products.filter(product => product.category === categoryName.toLowerCase());
        setFilteredProducts(filtered);
         }, [categoryName])

         useEffect(() => {
        window.scrollTo(0, 0);
      })


  return (
    <>
    <section className='section__container bg-primary-light'>
        <h2 className='section__header capitalize'>{categoryName}</h2>
        <p className='section__subheader'>Browse a divere range of categories, from chic dresses to versatile accesories.
          Elevate your style today!.
        </p>
    </section>
        {/*Product card*/}
        <div className='section__container'>
          <ProductCard products={filteredProducts}/>
        </div>
   
    </>
  )
}

export default CategoryPage