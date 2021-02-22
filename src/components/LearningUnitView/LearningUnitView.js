import React, { useState, useEffect } from 'react';
import LearningControls from './LearningControls';
import ProgressMark from './ProgressMark';
import LearningExpression1 from './LearningExpression1';
import LearningExpression2 from './LearningExpression2';

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
  const [expressions] = useState(props.expressions);
  const [currentExpression, setCurrentExpression] = useState(
    props.currentExpression,
  );

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    setCurrentExpression(0);
  }, [expressions]);

  const getCurrentExpression = () => {
    let expText = '---';

    if (props.expressions[currentExpression]) {
      expText = props.expressions[currentExpression].text;
    }

    return expText;
  }

  const getCurrentTranslation = () => {
    let transText = '---';

    if (props.expressions[currentExpression]) {
      transText = props.expressions[currentExpression].trans;
    }

    return transText;
  }

  const setExpressionLearned = () => {
    props.onExpressionLearned(props.expressions[currentExpression].id);
  }

  const getExpressionsTotal = () => {
    return props.expressions.length;
  }

  const getLearningProgress = () => {
    if (currentExpression >= 0 &&
        props.expressions.length > 0) {
      return currentExpression + 1;
    } else {
      return 0;
    }
  }

  const handleOnPrevious = () => {
    let expIndex = currentExpression;
    expIndex--;
    if (props.expressions[expIndex]) {
      setCurrentExpression(expIndex);
    }
  }

  const handleOnNext = () => {
    let expIndex = currentExpression;
    expIndex++;
    if (props.expressions[expIndex]) {
      setCurrentExpression(expIndex);
    }
  }

  const exprs = props.expressions.map(exp => {
    return (
      <ListItem button>
        <ListItemIcon>
          <EditIcon />
        </ListItemIcon>
        <ListItemText primary={exp.text} />
      </ListItem>
    );
  });

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
            <IconButton aria-label="edit">
              <MoreVertIcon />
            </IconButton>
          }
          title="Expression to learn"
          subheader="Verb"
          />
          <Divider />
          <CardContent className={classes.content}>
            <ProgressMark
              progress={getLearningProgress()}
              total={getExpressionsTotal()} />
            <LearningExpression1
              expression={getCurrentExpression()}
              onLearned={setExpressionLearned} />
            <LearningExpression2
              expression={getCurrentTranslation()} />
          </CardContent>
          <Divider />
          <CardActions disableSpacing>
            <LearningControls
              onPrevious={handleOnPrevious}
              onNext={handleOnNext} />
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
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Expressions in unit "{props.unit}"</Typography>
              <Divider />
              <List component="nav" aria-label="main expressions">
                {exprs}
              </List>
            </CardContent>
        </Collapse>
        </div>
      </Card>
    </div>
  );
}

export default LearningUnitView;
