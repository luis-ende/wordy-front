import React, { Component } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Layout from './hoc/Layout/Layout'
import LearningUnitBox from './components/LearningUnitBox/LearningUnitBox'
import ExpressionList from './containers/Expressions/ExpressionList'

class App extends Component {
  render() {
    return (      
      <BrowserRouter>
        <Layout>          
          <Routes>
            <Route path="/learn" element={<LearningUnitBox />} />
            <Route path="/review" element={<ExpressionList />} />
            <Route path="/" exact element={<ExpressionList />} />
          </Routes>          
        </Layout>      
      </BrowserRouter>          
    )
  }
}

export default App;
