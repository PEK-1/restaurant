import React from 'react';
import { BsInstagram, BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';

import { SubHeading } from '../../components';
import { images } from '../../constants';
import './Gallery.css';

const galleryimages = [images.gallery01, images.gallery02, images.gallery03, images.gallery04];

const Gallery = () => {
  const scrollRef = React.useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;

    if(direction === 'left') {
      current.scrollLeft  -= 600;
    } else {
      current.scrollLeft += 600;
    }
  }
  
  return (
    <div className='app__gallery'>
      <div className='app__gallery-content'>
        <SubHeading title='Instagram' />
        <h1 className='headtext__cormorant'>Photo Gallery</h1>
        <p className='p__opensana'style={{color: '#AAA', marginTop: '2rem'}}>Explore our vibrant dishes, elegant ambiance, and special events through our gallery! Each photo captures the essence of our culinary experience—from beautifully plated dishes to the cozy, inviting atmosphere we take pride in.</p>
        <button type='button' className='custom__button'>View More</button>
      </div>

      <div className='app__gallery-images'>
        <div className='app__gallery-images_container' ref={scrollRef}>
        {galleryimages.map((image, index) => (
          <div className='app__gallery-images_card flex__center' key={`gallery_image-${index + 1}`}>
            <img src={image} alt='galleryimage'/>
            <BsInstagram className='gallery__image-icon'/>
          </div>
        ))}
        </div>
        <div className='app__gallery-images_arrow'>
          <BsArrowLeftShort className='gallery__arrow-icon' onClick={() => scroll('left')} />
          <BsArrowRightShort className='gallery__arrow-icon' onClick={() => scroll('right')} />
        </div>
      </div>
    </div>
  );
}

export default Gallery;