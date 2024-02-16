import React from 'react';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import { Divider } from '@mui/material';
import "./slide.css";
import { NavLink } from 'react-router-dom';

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

const Slide = ({title, products}) => {
  // Check if products is not undefined and has length greater than 0
  const hasProducts = products && products.length > 0;

  return (
    <div className='products_section'>
        <div className='products_deal'>
            <h3>{title}</h3>
            <button className='view_btn'>View All</button>
        </div>
        <Divider/>
        {hasProducts ? ( // Only render the Carousel if there are products
            <Carousel
                responsive={responsive}
                infinite={true}
                draggable={false}
                swipeable={true}
                centerMode={true}
                autoPlay={true}
                autoPlaySpeed={2000}
                keyBoardControl={true}
                showDots={false}
                removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
                containerClass="carousel-container"
                animation='slide'
                indicators={false}
                navButtonsAlwaysVisible={true}
                cycleNavigation={true}
                navButtonsProps={{
                     style:{
                         backgroundColor:"#fff",
                         color:'#494949',
                         borderRadius:0,
                         marginTop:-22,
                         height:"104px"
                     }
                 }}
            >
                {products.map((e) => (
                    <NavLink to={`/getproductsone/${e.id}`} key={e.id}>
                         <div className='products_items'>
                            <div className='product_img'>
                                <img src={e.url} alt="productitem"/>
                            </div>
                            <p className='products_name'>{e.title.shortTitle}</p>
                            <p className='products_offer'>{e.discount}</p>
                            <p className='products_explore'>{e.tagline}</p>
                        </div>
                    </NavLink>
                ))}
            </Carousel>
        ) : (
            <p>No products available</p> // Or any placeholder to indicate no products are available
        )}
    </div>
  )
}

export default Slide;
