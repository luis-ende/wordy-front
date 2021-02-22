import React from 'react';

import Aux from '../Aux/Aux';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from '../../components/Navigation/NavBar'
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  contentRoot: {
    marginTop: theme.spacing(4),
  },
  contentTitle: {
    marginBottom: theme.spacing(4),
  },
  container: {
    maxWidth: '420px',
  }
}));

const Layout = (props) => {
  const classes = useStyles();

  return (
    <Aux>
      <header>
        <NavBar />
      </header>
      <main className={classes.contentRoot}>
        <Aux>
          <Container className={classes.container}>
            <Typography className={classes.contentTitle} component="h5" variant="h5">
              Welcome to the Wordy App
            </Typography>
            {props.children}
          </Container>
        </Aux>
      </main>
    </Aux>
  )
}

export default Layout;
