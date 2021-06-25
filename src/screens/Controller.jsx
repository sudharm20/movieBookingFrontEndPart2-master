import React from 'react'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Home from "./home/Home"
import BookShow from "./bookshow/BookShow"
import Confirmation from "./confirmation/Confirmation"
import Details from "./details/Details"

const baseUrl = "http://localhost:8085/api/"
const Controller = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={props => <Home {...props}  baseUrl={baseUrl}/>} />
        <Route
          path="/movie/:id"
          component={({ match }) => (
            <Details match={match}  baseUrl={baseUrl}/>
          )}
        />
        <Route path="/bookshow/:id" render={props => <BookShow {...props} baseUrl={baseUrl}/>}/>
        <Route path="/confirm/:id" render={props => <Confirmation {...props} baseUrl={baseUrl}/>}/>
      </Switch>
    </Router>
  )
}

export default Controller
