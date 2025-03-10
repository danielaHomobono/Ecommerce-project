import React from 'react'
import { useState } from 'react';
import productData from '../../data/products.json';
import ProductCard from '../shop/ProductCard';




const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const[filterProducts, setFilterProducts] = useState(productData);

    const handleSearch = () => {
        const query = searchQuery.toLowerCase();
        const filtered = productData.filter(product => product.name.toLowerCase().includes(query)|| product.description.toLowerCase().includes(query));
        setFilterProducts(filtered);
    }


  return (
    <>
    <section className='section__container bg-primary-light'>
        <h2 className='section__header capitalize'>Search page</h2>
        <p className='section__subheader'>Browse a divere range of categories, from chic dresses to versatile accesories.
          Elevate your style today!.
        </p>
    </section>
    <section className='section__container'>
      <div className='w-full mb-12 flex flex-col md:flex-row items-center justify-center gap-4'>
        <input type="text" 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className='search-bar w-full max-w-4xl p-2 border rounded'
        placeholder='Search for products...' />

        <button 
        onClick={handleSearch}
        className='search-button w-full md:w-auto py-2 px-8 bg-primary text-white rounded'>Search</button>
      </div>

      <ProductCard products={filterProducts}/>

    </section>
    </>
  )
}

export default Search