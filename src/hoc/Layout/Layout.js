import React from 'react';

import Aux from '../Aux/Aux';
//import { makeStyles } from '@mui/styles/makeStyles';
import NavBar from '../../components/Navigation/NavBar';
import Container from '@mui/material/Container';

const Layout = (props) => {
  return (
    <Aux>
      <header>
        <NavBar />
      </header>
      <main>        
        <Aux>
          <Container >
            {props.children}
          </Container>
        </Aux>
      </main>
    </Aux>
  )
}

export default Layout;
