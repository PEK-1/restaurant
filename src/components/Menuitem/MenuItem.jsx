// src/components/MenuItem/MenuItem.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './MenuItem.css';

const MenuItem = ({ title = 'Untitled', price = 'N/A', tags = '', type = 'Unknown' }) => {
  return (
    <div className="app__menuitem">
      <div className="app__menuitem-head">
        <div className="app__menuitem-name">
          <p className="p__cormorant" style={{ color: '#DCCA87' }}>
            {title}
          </p>
        </div>
        <div className="app__menuitem-dash" />
        <div className="app__menuitem-price">
          <p className="p__cormorant">${parseFloat(price).toFixed(2)}</p>
        </div>
      </div>
      <div className="app__menuitem-sub">
        <p className="p__opensans" style={{ color: '#AAA' }}>
          {tags}
        </p>
      </div>
      <div className="app__menuitem-type">
        <p className="p__opensans" style={{ color: '#AAA' }}>
          {type}
        </p>
      </div>
    </div>
  );
};

MenuItem.propTypes = {
  title: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  tags: PropTypes.string,
  type: PropTypes.string, // Added prop for type (wine, cocktail, food)
};

export default MenuItem;
