import React, { useState, useEffect } from 'react';
import LearningControls from './LearningControls';
import ProgressMark from './ProgressMark';
import LearningExpression1 from './LearningExpression1';
import LearningExpression2 from './LearningExpression2';
import ExpressionIsLearning from '../Expression/ExpressionIsLearning';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
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
}));

const LearningUnitView = (props) => {
  const classes = useStyles();
  const [expressions, setExpressions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentExpression, setCurrentExpression] = useState(null);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    setExpressions(props.expressions);
    setCurrentIndex(-1);
  }, [props.expressions]);

  useEffect(() => {
    setCurrentIndex(expressions.length > 0 ? 0 : -1);
  }, [expressions]);

  useEffect(() => {
    if (expressions[currentIndex]) {
      setCurrentExpression(expressions[currentIndex]);
    } else {
      setCurrentExpression(null);
    }
  }, [currentIndex]);

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
    <CardContent className={classes.content}>
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
        onIsLearningToggle={props.handleIsLearningToggle} />
      <IconButton
        className={clsx(classes.expand, {
          [classes.expandOpen]: expanded,
        })}
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
      <Card className={classes.root}>
        <div className={classes.details}>
          <CardHeader
          avatar={
            <Avatar aria-label="expression" className={classes.avatar}>
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
