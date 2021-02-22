import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout'
import LearningUnitBox from './components/LearningUnitBox/LearningUnitBox'
import ExpressionList from './containers/Expressions/ExpressionList'

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/review" component={ExpressionList} />
          <Route path="/" exact component={LearningUnitBox} />
        </Switch>
      </Layout>
    )
  }
}

export default App;
