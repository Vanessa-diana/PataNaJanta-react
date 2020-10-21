import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer';
import Menu from '../components/Menu/Menu';
import Routes from '../main/Routes'

import Detalhes from '../pages/DetalhesProduto/detalhes'

export default props => 
    <div className="container-fluid">
        <Header/>
        <Menu/>
        <Detalhes/>
        <Footer/>
    </div>


