import React from 'react'
import { Switch, Route } from 'react-router-dom'
// import Main from '../BestBoard/Main'
import MyFirstGrid from '../BestBoard/ReactGridLayout'
import Redirect from '../BestBoard/Redirect'
import Home from '../BestBoard/Home'

export default () => (
  <Switch>
    <Route exact path="/:boardId/" component={MyFirstGrid}/>
    <Route exact path="/board/:boardId" component={Redirect}/>
    <Route exact path="/" component={Home}/>
    <Route exact path="/null" component={Home}/>

  </Switch>
)