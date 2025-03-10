import React from 'react'
import dealsImg from "../../assets/deals.png"



const DealsSection = () => {
  return (
   <section className='section__container deals__container'>
    <div className='deals__image'>
        <img src={dealsImg} alt="" />
        </div>
        <div className='deals__content'>
            <h5>Get Up To 20% Discount</h5>
            <h4>Deals Of This Months</h4>
            <p>Our Women's Fashion Deals of the Month are here to make
                your style dreams come true. Shop the latest trends and
                express your unique style with our collection of exquisite clothing, accesories and footwear.

            </p>
            <div className='deals__countdown flex-wrap'>
                <div className='deals__countdown__card'>
                    <h4>14</h4>
                    <p>Days</p>
                </div>
                <div className='deals__countdown__card'>
                    <h4>20</h4>
                    <p>Hours</p>
                </div>
                <div className='deals__countdown__card'>
                    <h4>15</h4>
                    <p>Mins</p>
                    </div>
                <div className='deals__countdown__card'>
                    <h4>45</h4>
                    <p>Secs</p>
                </div>
                </div>
            </div>
        

   </section>
  )
}

export default DealsSection