import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Main from '../BestBoard/Main'
import MyFirstGrid from '../BestBoard/ReactGridLayout'
import Redirect from '../BestBoard/Redirect'

export default () => (
  <Switch>
    <Route exact path="/:boardId/" component={Main}/>
    <Route exact path="/board/:boardId" component={Redirect}/>
    <Route exact path="/react/" component={MyFirstGrid}/>
  </Switch>
)