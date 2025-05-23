import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GiHamburgerMenu} from 'react-icons/gi';
import { MdOutlineRestaurantMenu } from 'react-icons/md';
import Weather from '../Weather';
import images from '../../constants/images' ;
import './Navbar.css';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const user = useSelector((state) => state.auth.user);

  return (
  <nav className='app__navbar'>
    <div className='app__navbar-logo'>
      <img src={images.indienne} alt='app logo' />
    </div>
    <ul className='app__navbar-links'>
      <li className='p__opensans'><a href='/home'>Home</a></li>
      <li className='p__opensans'><a href='#about'>About</a></li>
      <li className='p__opensans'><a href='#menu'>Menu</a></li>
      <li className='p__opensans'><a href='#awards'>Awards</a></li>
      <li className='p__opensans'><a href='#contact'>Contact</a></li>
    </ul>
    <div className='app__weather'>
      <Weather />
    </div>
    <div className='app__navbar-login'>
      {user ? (
        <>
          <a href='/my-bookings' className='p__opensans'>My Bookings</a>
          <div/>
          <a href='/book-table' className='p__opensans'>Book Table</a>
        </>
      ) : (
        <>
      <a href='/login' className='p__opensans'>Login In / Register</a>
      <div/>
      <a href='/book-table' className='p__opensans'>Book Table</a>
        </>
      )}
    </div>
    <div className='app__navbar-smallscreen'>
      <GiHamburgerMenu color='#fff' fontSize={27} onClick={() => setToggleMenu(true)}/>     
      
      {toggleMenu && (
        <div className='app__navbar-smallscreen_overlay flex__center slide-bottom'>
          <MdOutlineRestaurantMenu fontSize={27} className='overlay__close' onClick={() => setToggleMenu(false)} />
          <ul className='app__navbar-smallscreen_links'>
            <li className='p__opensans'><a href='/home'>Home</a></li>
            <li className='p__opensans'><a href='#about'>About</a></li>
            <li className='p__opensans'><a href='#menu'>Menu</a></li>
            <li className='p__opensans'><a href='#awards'>Awards</a></li>
            <li className='p__opensans'><a href='#contact'>Contact</a></li>
          </ul>
        </div>
      )}
      
    </div>
  </nav>
  )
}

export default Navbar;
