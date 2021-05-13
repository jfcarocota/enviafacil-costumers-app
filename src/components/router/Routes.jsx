import React, { useEffect, useState } from "react";
import LoginForm from '../login/LoginForm';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import UsersSearch from "../users/UsersSearch";
import CostumersSearch from '../costumers/CostumersSearch'
import CostumersTableResults from "../costumers/CostumersTableResults";
import CostumerSelectedView from "../costumers/CostumerSelectedView";
import UsersTableResults from "../users/UsersTableResults";
import UserSelectedView from "../users/UserSelectedView";
import CostumerAddView from "../costumers/CostumerAddView";

const Routes = ({session})=> {
//para hacer las rutas faltantes, genera un componente que use base component pero enviando el prop de la opcion que debe estar selcted
  return (
    <Router>
       <Switch>
        <Route path="/costumerssearch" component={CostumersSearch}/>
        <Route path="/costumerstable" component={CostumersTableResults}/>
        <Route path="/userstable" component={UsersTableResults}/>
        <Route path="/costumer" component={CostumerSelectedView}/>
        <Route path="/addcostumer" component={CostumerAddView}/>
        <Route path="/user" component={UserSelectedView}/>
        <Route path="/usersssearch" component={UsersSearch}/>
        <Route path="/" component={!session ? LoginForm : CostumersSearch}/>
      </Switch>
    </Router>
  );
}

export default Routes;