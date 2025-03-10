
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import Framer Motion
import bannerImg from '../../assets/chica.png'; // Imagen del banner

const Banner = () => {
  // Variantes de animación para el texto h1
  const textVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: 'easeOut' } 
    },
  };

  // Variantes de animación para el botón
  const buttonVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      transition: { duration: 0.5, ease: 'easeOut', delay: 0.5 } 
    },
    hover: { 
      scale: 1.1, 
      boxShadow: '0px 4px 10px rgba(0,0,0,0.3)', 
      transition: { duration: 0.3 } 
    },
  };

  return (
    <div className="section__container header__container">
      {/* Contenido principal del banner */}
      <div className="header__content z-30">
        {/* Título animado con efecto de pulso */}
        <motion.h4
          className="uppercase"
          animate={{
            scale: [1, 1.2, 1], // Escalar: normal -> grande -> normal
          }}
          transition={{
            duration: 1.5, // Duración de cada ciclo
            repeat: 0, // Repetir infinitamente
            ease: "easeInOut", // Efecto suave
          }}
        >
          UP TO 20% Discount on
        </motion.h4>

        {/* Título principal animado */}
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          Girl's Fashion
        </motion.h1>

        <p>
          Discover the latest trends and express your unique style with our Women's fashion website.
          Shop the latest dresses, tops, jeans, and more from your favorite brands and new designers.
        </p>

        {/* Botón animado */}
        <motion.button
          className="btn"
          initial="hidden"
          animate="visible"
          whileHover="hover"
          variants={buttonVariants}
        >
          <Link to="/shop">EXPLORE NOW</Link>
        </motion.button>
      </div>

      {/* Imagen del banner */}
      <div className="header__image">
        <img src={bannerImg} alt="banner image" />
      </div>
    </div>
  );
};

export default Banner;
