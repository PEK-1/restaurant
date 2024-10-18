import React from 'react';
import { SubHeading } from '../../components';

import { images } from '../../constants';
import './Header.css';

const Header = () => (
  <div className='app__header app__wrapper section__padding' id="home">
    <div className='app__wrapper_info'>
      <SubHeading title="chase the new flavour"/>
      <h1 className='app__header-h1'>The Essence Of Fine Dining</h1>
      <p className='p__opensans' style={{margin: '2rem 0'}}>Where every bite unlocks a world of flavour and elegance</p>
      <button type='button' className='custom__button'>Explore Menu</button>
    </div>

    <div className='app__wrappper_img'>
      <img className='header_img' src={images.welcome} alt='header img'/>
    </div>

  </div>
);

export default Header;
