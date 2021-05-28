import * as React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Table from "./containers/Table"
import Game from "./containers/Game"
import './css/App.css'


class App extends React.Component {
  public render() {
    return (
      <Router>
        <Route exact path="/" component={Table} />
        <Route exact path="/game" component={Game} />
      </Router>
    );
  }
}

export default App;


