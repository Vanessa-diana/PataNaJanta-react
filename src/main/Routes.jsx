import React from 'react'
import { Router,Route,Redirect,hashHistory } from 'react-router'
import Home from '../pages/Home/Home'
import FaleConosco from '../pages/FaleConosco/FaleConosco'
import AdotePet from '../pages/AdotePet/AdotePet'
import Login from '../pages/Login/Login'
import Carrinho from '../pages/Carrinho/Carrinho'
import Cadastro from '../pages/Cadastro/Cadastro'
import Checkout from '../pages/Checkout/Checkout'
import DetalheProduto from '../pages/DetalhesProduto/Detalhes'
import HistoricoPedido from '../pages/HistoricoDePedido/HistoricoDePedido'
import Sucesso from '../pages/SucessoPedido/Sucesso'
import ResultadoProduto from '../pages/Resultado-produto/Resultado'
import EnderecoCliente from '../pages/Endereco-cliente/EnderecoCliente'
import SeuEspaco from '../pages/SeuEspaco/SeuEspaco'
import FormEndereco from '../pages/FormEndereco/FormEndereco'
import EsqueciSenha from '../pages/EsqueciSenha/EsqueciSenha'
import FormCliente from '../pages/FormCliente/FormCliente'


export default props => (
    <Router history={hashHistory}>
    <Route path = '/home' component={Home}/>
    <Route path = '/faleconosco' component={FaleConosco}/>
    <Route path ='/adotepet' component={AdotePet}/>
    <Route path = '/login' component={Login}/>
    <Route path = '/carrinho' component={Carrinho}/>
    <Route path = '/cadastro' component={Cadastro}/>
    <Route path = '/checkout' component={Checkout}/>
    <Route path = '/detalhe' component={DetalheProduto}/>
    <Route path = '/historicopedido' component={HistoricoPedido}/>
    <Route path = '/sucessopedido' component={Sucesso}/>
    <Route path = '/resultadoproduto' component={ResultadoProduto}/>
    <Route path = '/seuespaco' component={SeuEspaco}/>
    <Route path = '/enderecocliente' component = {EnderecoCliente}/>
    <Route path = '/formendereco' component = {FormEndereco}/>
    <Route path= '/esquecisenha' component= {EsqueciSenha}/>
    <Route path= '/formcliente' component= {FormCliente}/>
    <Redirect from='*' to='/home'/>
    </Router>
)