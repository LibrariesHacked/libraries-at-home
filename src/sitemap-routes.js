import React from 'react'
import { Switch, Route } from 'react-router'

export default (
  <Switch>
    <Route path='/watch' />
    <Route path='/read' />
    <Route path='/listen' />
    <Route path='/about' />
    <Route path='/accessibility' />
    <Route path='/data' />
    <Route path='/privacy' />
    <Route path='/:service' />
  </Switch>
)
