import React from 'react'
import { Router,Route,Redirect,hashHistory } from 'react-router'
import Home from '../pages/Home/Home'
import FaleConosco from '../pages/FaleConosco/FaleConosco'
import AdotePet from '../pages/AdotePet/AdotePet'
import Login from '../pages/Login/Login'
import Carrinho from '../pages/Carrinho/Carrinho'
import Cadastro from '../pages/Cadastro/Cadastro'
import Checkout from '../pages/Checkout/Checkout'
import HistoricoPedido from '../pages/HistoricoDePedido/HistoricoDePedido'
import Sucesso from '../pages/SucessoPedido/Sucesso'


export default props => (
    <Router history={hashHistory}>
        <Route path = '/home' component={Home}/>
        <Route path = '/faleconosco' component={FaleConosco}/>
        <Route path ='/adotepet' component={AdotePet}/>
        <Route path = '/login' component={Login}/>
        <Route path = '/carrinho' component={Carrinho}/>
        <Route path = '/cadastro' component={Cadastro}/>
        <Route path = '/checkout' component={Checkout}/>
        <Route path = '/historicopedido' component={HistoricoPedido}/>
        <Route path = '/sucessopedido' component={Sucesso}/>
    <Redirect from='*' to='/home'/>
    </Router>
)