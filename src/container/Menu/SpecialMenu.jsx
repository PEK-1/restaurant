// src/containers/Menu/SpecialMenu.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SubHeading, MenuItem } from '../../components';
import { setMenuItems } from '../../menuSlice'; // Import the action to set menu items
import { images } from '../../constants';
import './SpecialMenu.css';
import axios from 'axios';

const SpecialMenu = () => {
  const dispatch = useDispatch();
  
  // Fetch menu data from Redux store
  const menuData = useSelector((state) => state.menu);

  // Fetch menu data from the backend API
  useEffect(() => {
    axios.get('http://localhost:3001/api/menu')
      .then((response) => {
        dispatch(setMenuItems(response.data)); // Dispatch to Redux store to update menu data
      })
      .catch((error) => {
        console.error('Error fetching menu:', error);
      });
  }, [dispatch]);

  // Filter wines and cocktails from the menu data
  const wines = menuData.filter(item => item.type === 'wine');
  const cocktails = menuData.filter(item => item.type === 'cocktail');

  return (
    <div className='app__specialMenu flex__center section__padding' id='menu'>
      <div className='app__specialMenu-title'>
        <SubHeading title="Menu that fits your Palate" />
        <h1 className='headtext__cormorant'>Today's Special</h1>
      </div>

      <div className='app__specialMenu-menu'>
        <div className='app__specialMenu-menu_wine flex__center'>
          <p className='app__specialMenu-menu_heading'>Wine & Beer</p>
          <div className='app__specialMenu_menu_items'>
            {wines.map((wine, index) => (
              <MenuItem key={wine.title + index} title={wine.title} price={wine.price} tags={wine.tags} />
            ))}
          </div>
        </div>

        <div className='app__specialMenu-menu_img'>
          <img src={images.menu} alt='menu img' />
        </div>

        <div className='app__specialMenu-menu_cocktails flex__center'>
          <p className='app__specialMenu-menu_heading'>Cocktails</p>
          <div className='app__specialMenu_menu_items'>
            {cocktails.map((cocktail, index) => (
              <MenuItem key={cocktail.title + index} title={cocktail.title} price={cocktail.price} tags={cocktail.tags} />
            ))}
          </div>
        </div>
      </div>
      
      <div style={{ marginTop: '15px' }}>
        <button type='button' className='custom__button'>View More</button>
      </div>
    </div>
  );
};

export default SpecialMenu;
