import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Main from '../BestBoard/Main'
import Redirect from '../BestBoard/Redirect'

export default () => (
  <Switch>
    <Route exact path="/:boardName/" component={Main}/>
    <Route exact path="/board/:boardId" component={Redirect}/>
  </Switch>
)