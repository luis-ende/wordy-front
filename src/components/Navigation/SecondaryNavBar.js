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
              Vocabulary List
          </NavLink>
        </li>
        <li>
          <NavLink
              to='/learn'
              >
              Learn
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default SecondaryNavBar;
