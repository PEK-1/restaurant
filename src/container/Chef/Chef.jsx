import React from 'react';

import { SubHeading } from '../../components';
import { images } from '../../constants';
import './Chef.css';

const Chef = () => (
  <div className='app__bg app__wrapper section__padding'>
    <div className='app__wrapper_img app__wrapper_img-reverse'>
      <img src={images.chef} alt='chef' />
    </div>
    <div className='app__wrapper_info'>
      <SubHeading title="Chef's Word" />
      <h1 className='headtext__cormorant'>What We Belive In</h1>
      <div className='app__chef-content'>
        <div className='app__chef-content_quote'>
          <img src={images.quote} alt='quote' />
          <p className='p__opensans'> A celebration of India’s heritage, reimagined for fine dining</p>
        </div>
        <p className='p__opensans'>we honor the deep-rooted culinary traditions of India, while adding a modern twist to elevate each dish to Michelin-starred perfection. Every plate is a harmonious blend of authentic Indian flavors and innovative techniques, offering a dining experience that reflects the rich heritage of India in a sophisticated and contemporary setting.</p>
      </div>
      <div className='app__chef-sign'>
        <p></p>
        <p className='p__opensans'>chef and founder</p>
        <img src={images.sign} alt='sign' />
      </div>
    </div>
  </div>
);

export default Chef;
