import React, { useState, useEffect } from 'react';

import axios from '../../axios-wordyapp';

import LearningControls from './LearningControls';
import ProgressMark from './ProgressMark';
import LearningExpression1 from './LearningExpression1';
import LearningExpression2 from './LearningExpression2';
import ExpressionIsLearning from '../Expression/ExpressionIsLearning';

//import { makeStyles } from '@mui/styles/makeStyles';
import clsx from 'clsx';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Divider from '@mui/material/Divider';

/* const useStyles = makeStyles((theme) => ({
  root: {
    width: '420px',
    display: 'flex',
  },
  details: {
    width: '420px',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
})); */

const LearningUnitView = (props) => {
  //const classes = useStyles();
  const [expressions, setExpressions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentExpression, setCurrentExpression] = useState(null);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    setExpressions(props.expressions.filter(e => e.isLearning));
    setCurrentIndex(props.expressions.length > 0 ? 0 : -1);
  }, [props.expressions]);

  useEffect(() => {
    if (((currentIndex + 1) > expressions.length) &&
      (expressions.length > 0)) {
      setCurrentIndex(currentIndex => currentIndex - 1);
    }
  }, [expressions, currentIndex]);

  useEffect(() => {
    if (expressions[currentIndex]) {
      setCurrentExpression(expressions[currentIndex]);
    } else {
      setCurrentExpression(null);
    }
  }, [expressions, currentIndex]);

  const getExpressionsTotal = () => {
    return expressions.length;
  }

  const getLearningProgress = () => {
    if (currentIndex >= 0 &&
        expressions.length > 0) {
      return currentIndex + 1;
    } else {
      return 0;
    }
  }

  const handleOnPrevious = () => {
    let expIndex = currentIndex;
    if (expressions[--expIndex]) {
      setCurrentIndex(expIndex);
    }
  }

  const handleOnNext = () => {
    let expIndex = currentIndex;
    if (expressions[++expIndex]) {
      setCurrentIndex(expIndex);
    }
  }

  const handleIsLearningToggle = () => {
    const isLearningToggled = !currentExpression.isLearning;
    const updatedCurrentExpression = {
      ...currentExpression,
      isLearning: isLearningToggled
    }

    axios.patch( `expressions/${currentExpression.id}`, updatedCurrentExpression,
      { headers: { 'Content-Type': 'application/merge-patch+json' } } )
    .then( response=> {
      let index = expressions.findIndex(e => e.id === currentExpression.id);
      let updatedExpressions = [...expressions];
      updatedExpressions[index] = updatedCurrentExpression;
      setExpressions(updatedExpressions.filter(e => e.isLearning));
    }).catch( error => {
    });
  }

  const expressionList = expressions.map(exp => {
    return (
      <ListItem
        key={exp.id}
        button>
        <ListItemIcon>
          <EditIcon />
        </ListItemIcon>
        <ListItemText
          primary={exp.textLanguage1} />
      </ListItem>
    );
  });

  const expressionCard = (
    <CardContent >
      <ProgressMark
        progress={getLearningProgress()}
        total={getExpressionsTotal()} />
      <LearningExpression1
        expression={currentExpression && currentExpression.textLanguage1}
       />
      <LearningExpression2
        expression={currentExpression && currentExpression.textLanguage2} />
    </CardContent>
  );

  const expressionActions = (
    <CardActions disableSpacing>
      <LearningControls
        onPrevious={handleOnPrevious}
        onNext={handleOnNext}
      />
      <ExpressionIsLearning
        id={currentExpression && currentExpression.id}
        isLearning={currentExpression && currentExpression.isLearning}
        onIsLearningToggle={handleIsLearningToggle} />
      <IconButton
        /* className={clsx(classes.expand, {
          [classes.expandOpen]: expanded,
        })} */
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <ExpandMoreIcon />
      </IconButton>
    </CardActions>
  );

  return (
    <div>
      <Card >
        <div >
          <CardHeader
          avatar={
            <Avatar aria-label="expression" >
              W
            </Avatar>
          }
          action={
            currentExpression &&
            <IconButton aria-label="edit">
              <MoreVertIcon />
            </IconButton>
          }
          title={currentExpression ? "Expression to learn." : "No expressions to learn."}
          subheader={currentExpression ? "Verb" : "Select a learning unit."}
          />
          <Divider />
          {currentExpression && expressionCard}
          <Divider />
          {currentExpression && expressionActions}
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Expressions in unit "{props.unit}"</Typography>
              <Divider />
              <List component="nav" aria-label="main expressions">
                {expressionList}
              </List>
            </CardContent>
        </Collapse>
        </div>
      </Card>
    </div>
  );
}

export default LearningUnitView;
