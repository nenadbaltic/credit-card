import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Cards from "./components/Cards";
import CardForm from './components/CardForm';

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Switch>
          <Route exact path="/cards" component={Cards} />
          <Route path="/cards/add" component={CardForm} />
          <Route path="/cards/:id/edit" component={CardForm} />
          <Redirect to="/cards" />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
