import React from 'react'
import { Switch, Route } from 'react-router-dom'
// import Main from '../BestBoard/Main'
import MyFirstGrid from '../BestBoard/ReactGridLayout'
import Redirect from '../BestBoard/Redirect'
import First from '../BestBoard/First'

export default () => (
  <Switch>
    <Route exact path="/:boardId/" component={MyFirstGrid}/>
    <Route exact path="/board/:boardId" component={Redirect}/>
    <Route exact path="/" component={First}/>
    <Route exact path="/null" component={First}/>

  </Switch>
)