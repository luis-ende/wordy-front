import React from 'react';

import Aux from '../Aux/Aux';
//import { makeStyles } from '@mui/styles/makeStyles';
import NavBar from '../../components/Navigation/NavBar';
import SecondaryNavBar from '../../components/Navigation/SecondaryNavBar';
import Container from '@mui/material/Container';

/* const useStyles = makeStyles((theme) => ({
  contentRoot: {
  },
  contentTitle: {
    marginBottom: theme.spacing(4),
  },
  container: {
    maxWidth: '420px',
  }
})); */

const Layout = (props) => {
  //const classes = useStyles();

  return (
    <Aux>
      <header>
        <NavBar />
      </header>
      <main>
        <SecondaryNavBar />
        <Aux>
          <Container>
            {props.children}
          </Container>
        </Aux>
      </main>
    </Aux>
  )
}

export default Layout;
