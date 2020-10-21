import React from 'react';
import { Router,Route,Redirect,hashHistory } from 'react-router';
import Home from '../pages/Home/Home'
import Sucesso from '../pages/SucessoPedido/Sucesso'
import Cadastro from '../pages/Cadastro/Cadastro'


export default props => (
    <Router history={hashHistory}>
    <Route path = '/home' component = {Home}/>
    <Route path = '/sucesso' component = {Sucesso}/>
    <Route path = '/cadastro' component = {Cadastro}/>
    <Redirect from = '*' to ='/home'/>
    </Router>
)