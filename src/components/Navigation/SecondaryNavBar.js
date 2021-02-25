import React from 'react';
import { NavLink } from 'react-router-dom';

import './SecondaryNavBar.css';

const SecondaryNavBar = () => {
  return (
    <div className='SecondaryNavBar'>
      <ul className='SecondaryNavBarItems'>
        <li>
          <NavLink
              to='/'
              exact>
              Learn
          </NavLink>
        </li>
        <li>
          <NavLink
              to='/review'>
              Vocabulary List
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default SecondaryNavBar;
