import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export const TopSlider: React.FC = () => {
	
	var settings = {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 4,
		initialSlide: 0,
		responsive: [
		  {
			breakpoint: 1024,
			settings: {
			  slidesToShow: 3,
			  slidesToScroll: 3,
			  infinite: true,
			  dots: false
			}
		  },
		  {
			breakpoint: 600,
			settings: {
			  slidesToShow: 3,
			  slidesToScroll: 3,
			  initialSlide: 3,
			  dots: false
			}
		  },
		  {
			breakpoint: 480,
			settings: {
			  slidesToShow: 2,
			  slidesToScroll: 2,
			  initialSlide: 2,
			  dots: false
			}
		  }
		]
    };
	
	return (
		<div className="slider-container">
			<Slider {...settings}>
				<div>
					<img src="/assets/silver-shield.png" alt="Silver Badge"className="border rounded-3 slider-image"/>
				</div>
				<div style={{ border: '1px solid #DCDCDC' }}>
					<img src="/assets/gold-shield.png" alt="Silver Badge" className="border rounded-3 slider-image"/>
				</div>
				<div style={{ border: '1px solid #DCDCDC' }}>
					<img src="/assets/iron-shield.png" alt="Silver Badge" className="border rounded-3 slider-image"/>
				</div>
				<div style={{ border: '1px solid #DCDCDC' }}>
					<img src="/assets/iron-shield.png" alt="Silver Badge" className="border rounded-3 slider-image"/>
				</div>
				<div style={{ border: '1px solid #DCDCDC' }}>
					<img src="/assets/gold-shield.png" alt="Silver Badge" className="border rounded-3 slider-image"/>
				</div>
				<div style={{ border: '1px solid #DCDCDC' }}>
					<img src="/assets/silver-shield.png" alt="Silver Badge" className="border rounded-3 slider-image"/>
				</div>
			</Slider>
		</div>
	);
};