import React from 'react'
import { Switch, Route } from 'react-router-dom'
// import Main from '../BestBoard/Main'
import ReactGridLayout from '../BestBoard/ReactGridLayout'
import Redirect from '../BestBoard/Redirect'
import Home from '../BestBoard/Home'
import Login from '../BestBoard/Login'

export default () => (
  <Switch>
    <Route exact path="/" component={Login}/>
    <Route exact path="/Home" component={Home}/>
    <Route exact path="/null" component={Home}/>
    <Route exact path="/:boardId/" component={ReactGridLayout}/>
    <Route exact path="/board/:boardId" component={Redirect}/>
  </Switch>
)