import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min'
import HeaderCarrinho from '../components/Header-carrinho/HeaderCarrinho'
import Footer from '../components/Footer/Footer'
import Carrinho from '../pages/Carrinho/Carrinho';




import Detalhes from '../pages/DetalhesProduto/detalhes'

export default props => 
    <div className="container-fluid">
        <HeaderCarrinho/>
        <Carrinho/>
        <Footer/>
    </div>


