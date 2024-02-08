import React from 'react';
import { NavLink } from 'react-router-dom';

import './SecondaryNavBar.css';

const SecondaryNavBar = () => {
  return (
    <div className='SecondaryNavBar'>
      <ul className='SecondaryNavBarItems'>
        <li>
          <NavLink
              end
              to='/'
              exact>
              Vocabulary List
          </NavLink>
        </li>
        <li>
          <NavLink
              end
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
