import React, { useEffect, useRef } from 'react';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export function CarruselOfertas() {

    const sliderRef = useRef<Slider>(null);

    useEffect(() => {
        const slider = sliderRef.current;

        const interval = setInterval(() => {
            if (slider) {
                slider.slickNext();
            }
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const settings: Settings = {
        dots: false,
        infinite: true,
        speed: 2000,
        autoplay: true,
        autoplaySpeed: 4000,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <>
            <Slider ref={sliderRef} {...settings} className="mx-4">
                <div className="carrusel-item">
                    <img src="https://m.media-amazon.com/images/I/71NtjKt82VL.jpg" alt="Oferta 1" className="border rounded-lg p-2 w-93 h-[450px]" />
                    {/* <h3>Producto 1</h3>
                <p>Descripción del producto 1</p> */}
                </div>
                <div className="carrusel-item">
                    <img src="https://m.media-amazon.com/images/P/B00CP8ZNUC.01._SCLZZZZZZZ_SX500_.jpg" alt="Oferta 2" className="border rounded-lg p-2 w-93 h-[450px]" />
                    {/* <h3>Producto 2</h3>
                <p>Descripción del producto 2</p> */}
                </div>
                <div className="carrusel-item">
                    <img src="https://m.media-amazon.com/images/I/51fW55S01fL._SX324_BO1,204,203,200_.jpg" alt="Oferta 3" className="border rounded-lg p-2 w-93 h-[450px]" />
                    {/* <h3>Producto 3</h3>
                <p>Descripción del producto 3</p> */}
                </div>
                <div className="carrusel-item">
                    <img src="https://m.media-amazon.com/images/I/71Pj9HPkCFL.jpg" alt="Oferta 4" className="border rounded-lg p-2 w-93 h-[450px]" />
                    {/* <h3>Producto 4</h3>
                <p>Descripción del producto 4</p> */}
                </div>
                <div className="carrusel-item">
                    <img src="https://m.media-amazon.com/images/I/71NtjKt82VL.jpg" alt="Oferta 1" className="border rounded-lg p-2 w-93 h-[450px]" />
                    {/* <h3>Producto 1</h3>
                <p>Descripción del producto 1</p> */}
                </div>
                <div className="carrusel-item">
                    <img src="https://m.media-amazon.com/images/I/71Pj9HPkCFL.jpg" alt="Oferta 4" className="border rounded-lg p-2 w-93 h-[450px]" />
                    {/* <h3>Producto 4</h3>
                <p>Descripción del producto 4</p> */}
                </div>
                <div className="carrusel-item">
                    <img src="https://m.media-amazon.com/images/I/71NtjKt82VL.jpg" alt="Oferta 1" className="border rounded-lg p-2 w-93 h-[450px]" />
                    {/* <h3>Producto 1</h3>
                <p>Descripción del producto 1</p> */}
                </div>

            </Slider>
            <p className="text-center text-sm text-red-600 font-bold mt-2 mb-4">
                Solo por hoy en descuento, ¡aprovecha!
            </p>
        </>
    );
}


