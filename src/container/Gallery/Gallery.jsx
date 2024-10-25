import React from 'react';
import { BsInstagram, BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';

import { SubHeading } from '../../components';
import { images, data } from '../../constants';
import './Gallery.css';

const Gallery = () => {
  
  
  return (
    <div className='app__gallery'>
      <div className='app__gallery-content'>
        <SubHeading title='Instagram' />
        <h1 className='headtext__cormorant'>Photo Gallery</h1>
        <p className='p__opensana'style={{color: '#AAA', marginTop: '2rem'}}></p>
      </div>
    </div>
  );
}

export default Gallery;
