import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Main from '../BestBoard/Main'

export default () => (
  <Switch>
    <Route exact path="/" component={Main}/>
    <Route exact path="/:boardId" component={Main}/>
  </Switch>
)