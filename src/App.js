import React from 'react'
import { HashRouter, Route, Switch } from "react-router-dom"
import './App.css'
import English from './English'
import Spanish from './Spanish'



export default function App() {

  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact component={English} />
        <Route path="/" component={Spanish} />
      </Switch>

    </HashRouter>
  );
}
