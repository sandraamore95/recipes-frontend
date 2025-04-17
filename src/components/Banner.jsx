import React from 'react';

const Banner = () => {
  return (
    <section className='banner'>
    <div
      className=" text-white d-flex align-items-center justify-content-center text-center"
      style={{
        backgroundImage: `url('https://imagenes.heraldo.es/files/image_1920_1080/uploads/imagenes/2017/05/12/_desayuno_ad58aa17.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        imageRendering: 'optimizeQuality',
        height: '440px',
        padding: '2rem'
      }}
    >
      <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '1.5rem', borderRadius: '10px' }}>
        <h1>Come Rico, Vive Mejor</h1>
        <p>Encuentra recetas frescas, deliciosas y fáciles para cada día.</p>
      </div>
    </div></section>
  );
};

export default Banner;
