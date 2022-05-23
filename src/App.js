import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Start from "./Components/Start/Start";
import Battle from "./Components/Battle/Battle";
import Gallery from "./Components/Gallery/Gallery";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h2>Hamster War</h2>
          <nav>
            <Link to="/">Start</Link>
            <Link to="/battle">Battle</Link>
            <Link to="/gallery">Gallery</Link>
          </nav>
        </header>

        <main>
          <Switch>
            <Route exact path="/">
              <Start />
            </Route>
            <Route path="/battle">
              <Battle />
            </Route>
            <Route path="/gallery">
              <Gallery />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
